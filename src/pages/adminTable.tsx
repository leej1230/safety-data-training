import Navbar from "@/components/Navbar";
import Head from "next/head";
import { requireAuth } from "../authUtils";
import { firestore } from "../../lib/FirebaseConfig";
import {
  collection,
  query,
  getDocs,
  collectionGroup,
  doc,
  getDoc,
  where
} from "firebase/firestore";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface User {
  fullName: string;
  uid: string;
}

interface Certificate {
  approveStatus: string;
  certificateName: string;
  duration: number;
  pdf: string;
  submissionDate: { toDate: () => Date };
  uid: string;
  fullName?: string;
  expirationDate?: Date; // Add expirationDate field
}

const AdminCertificateList = () => {
  const [certificatesList, setCertificatesList] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllSubmissions = async () => {
    const certificatesCollectionRef = collectionGroup(
      firestore,
      "certificates"
    );
    const querySnapshot = await getDocs(certificatesCollectionRef);

    const certificates: Certificate[] = [];

    for (const certificateDoc of querySnapshot.docs) {
      const certificateData = certificateDoc.data() as Certificate;
      const uid = certificateDoc.ref.parent.parent?.id || "";
      certificates.push({
        ...certificateData,
        uid: uid,
      });
      console.log("Current user UID:", uid);
    }

    return certificates;
  };

  const fetchUserFullName = async (userId: string): Promise<string> => {
    const userCollectionRef = collection(firestore, "users");
    const userQuery = query(userCollectionRef, where("uid", "==", userId));
    const userSnapshot = await getDocs(userQuery);
  
    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data() as User;
      console.log("Full name:", userData.fullName);
      return userData.fullName;
    } else {
      return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const certificates = await fetchAllSubmissions();

        const updatedCertificates = await Promise.all(
          certificates.map(async (certificate) => {
            const fullName = await fetchUserFullName(certificate.uid);

            const submissionDate = certificate.submissionDate.toDate();
            const expirationDate = new Date(submissionDate);
            expirationDate.setDate(expirationDate.getDate() + certificate.duration);

            return {
              ...certificate,
              fullName,
              expirationDate,
            };
          })
        );

        setCertificatesList(updatedCertificates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Certificate Landing</title>
      </Head>

      <Navbar />

      <main>
        <div className="text-center my-2">
          <h2>Welcome!</h2>
          <h2>Check Certificate Status Or Submit.</h2>
        </div>
        <div className="border mx-5 my-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">Certificate Name</th>
                <th scope="col">Submission Date</th>
                <th scope="col">Expiration Date</th>
                <th scope="col">Status</th>
                <th scope="col">Document</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    <CircularProgress />
                  </td>
                </tr>
              ) : (
                certificatesList.map((certificate, index) => {
                  const currentDate = new Date();
                  const expirationDate = certificate.expirationDate || new Date();
                  const status = currentDate > expirationDate ? "Expired" : "Valid";

                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{certificate.fullName}</td>
                      <td>{certificate.certificateName}</td>
                      <td>
                        {certificate.submissionDate.toDate().toLocaleDateString()}
                      </td>
                      <td>
                        {expirationDate.toLocaleDateString()}
                      </td>
                      <td>{status}</td>
                      <td>
                        <a
                          href={certificate.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Document
                        </a>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default requireAuth(AdminCertificateList);
