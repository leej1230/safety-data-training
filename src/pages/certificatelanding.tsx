import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import  Button from "@mui/material/Button";
import NoteAdd from "@mui/icons-material/NoteAdd";
import { requireAuth } from "../authUtils";
import { auth, firestore, storage } from "../../lib/FirebaseConfig";
import { collection, query, doc, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from "react";


const CertificationData = [
  {
    CertificateTitle: "Certificate A",
    ApprovedDate: "2021/12/12",
    ExpirationDate: "2022/3/12",
    Status: "Expired",
  },
  {
    CertificateTitle: "Certificate B",
    ApprovedDate: "2023/02/15",
    ExpirationDate: "2022/10/15",
    Status: "Valid",
  },
  {
    CertificateTitle: "Certificate C",
    ApprovedDate: "----/--/--",
    ExpirationDate: "----/--/--",
    Status: "Pending",
  },
];

const CertificateLanding = () => {
  const router = useRouter();
  const [certificates,setCertificates] = useState<any>([]);

  const getCurrentUserUid = () => {
    const user = auth.currentUser
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
      const userDocRef = doc(collection(firestore, 'certificates'), uid);
      const certificatesSubcollectionRef = collection(userDocRef, 'certificates');
      const q = query(certificatesSubcollectionRef);

      const querySnapshot = await getDocs(q);

      const submissions = querySnapshot.docs.map((doc) => {
        const submissionData = doc.data();
        return {
          certificateId: doc.id,
          ...submissionData
        };
      });

      console.log(submissions);
      return submissions;
    } catch (error) {
      console.error('Error fetching user submissions:', error);
      return [];
    }
};

  useEffect(()=>{
    const uid = getCurrentUserUid();
    if(uid){
      setCertificates(fetchUserSubmissions(uid));
      console.log("ReturnValue:", certificates);
    }

  },[]);


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
              {CertificationData.map((cdata, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td colSpan={2}>{cdata.CertificateTitle}</td>
                    <td>{cdata.ApprovedDate}</td>
                    <td>{cdata.ExpirationDate}</td>
                    <td>{cdata.Status}</td>
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
