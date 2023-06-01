import Navbar from "@/components/Navbar";
import Head from "next/head";
import { requireAuth } from "../authUtils";
import { firestore } from "../../lib/FirebaseConfig";
import { collectionGroup, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Certificate {
  fullName: string;
  approveStatus: string;
  certificateName: string;
  submissionDate: { toDate: () => Date };
  duration: number;
  documentLink: string;
}

const AdminCertificateList = () => {
  const [certificatesList, setCertificatesList] = useState<Certificate[]>([]);

  const fetchAllSubmissions = async () => {
    const certificatesCollectionRef = collectionGroup(firestore, "certificates");
    const querySnapshot = await getDocs(certificatesCollectionRef);

    const certificates: Certificate[] = querySnapshot.docs.map((certificateDoc) => {
      const certificateData = certificateDoc.data() as Certificate;
      return {
        ...certificateData,
      };
    });

    console.log(certificates);
    return certificates;
  };

  useEffect(() => {
    const fetchData = async () => {
      const certificates = await fetchAllSubmissions();
      setCertificatesList(certificates);
      console.log("ReturnValue:", certificates);
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
              {certificatesList.map((certificate, index) => {
                const {
                  fullName,
                  approveStatus,
                  certificateName,
                  submissionDate,
                  duration,
                  documentLink,
                } = certificate;

                const expirationDate = new Date(
                  submissionDate.toDate().getTime() + duration * 24 * 60 * 60 * 1000
                );

                const currentDate = new Date();
                let status = "Pending";

                if (currentDate > expirationDate) {
                  status = "Expired";
                } else {
                  status = "Valid";
                }

                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{fullName}</td>
                    <td>{certificateName}</td>
                    <td>{submissionDate.toDate().toLocaleDateString()}</td>
                    <td>{expirationDate.toLocaleDateString()}</td>
                    <td>{status}</td>
                    <td>
                      <a href={documentLink}>Download</a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default requireAuth(AdminCertificateList);
