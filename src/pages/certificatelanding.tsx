import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import NoteAdd from "@mui/icons-material/NoteAdd";
import { requireAuth } from "../authUtils";
import { auth, firestore } from "../../lib/FirebaseConfig";
import {
  collection,
  query,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const CertificateLanding = () => {
  const router = useRouter();
  const [certificates, setCertificates] = useState<any>([]);

  const getCurrentUserUid = () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      console.log("Current user UID:", uid);
      return uid;
    } else {
      console.log("No user is currently logged in.");
      router.push("/signin");
      return null;
    }
  };

  const fetchUserSubmissions = async (uid: string) => {
    try {
      const userDocRef = doc(collection(firestore, "certificates"), uid);
      const certificatesSubcollectionRef = collection(
        userDocRef,
        "certificates"
      );
      const q = query(certificatesSubcollectionRef);

      const querySnapshot = await getDocs(q);

      const submissions = querySnapshot.docs.map((doc) => {
        const submissionData = doc.data();
        return {
          certificateId: doc.id,
          ...submissionData,
        };
      });

      console.log(submissions);
      return submissions;
    } catch (error) {
      console.error("Error fetching user submissions:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const uid = getCurrentUserUid();
      if (uid) {
        const userSubmissions = await fetchUserSubmissions(uid);
        setCertificates(userSubmissions);
        console.log("ReturnValue:", userSubmissions);
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
          <h2>Welcome {auth.currentUser?.displayName?.split(" ")[0]}!</h2>
          <h2>Check Certificate Status Or Submit.</h2>
        </div>
        <div className="border mx-5 my-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" colSpan={2}>
                  Certificate Title
                </th>
                <th scope="col">Approved Date</th>
                <th scope="col">Expiration Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate: any, index: number) => {
                const {
                  approveStatus,
                  certificateName,
                  submissionDate,
                  duration,
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
                    <td colSpan={2}>{certificateName}</td>
                    <td>{submissionDate.toDate().toLocaleDateString()}</td>
                    <td>{expirationDate.toLocaleDateString()}</td>
                    <td>{status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="d-flex justify-content-center align-items-start m-3">
            <Button
              variant="contained"
              endIcon={<NoteAdd />}
              onClick={() => {
                window.location.href = "/uploadcertificate";
              }}
            >
              Submit New Certificate
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default requireAuth(CertificateLanding);