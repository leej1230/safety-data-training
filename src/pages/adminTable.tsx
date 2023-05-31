import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { requireAuth } from "../authUtils";
import { firestore } from "../../lib/FirebaseConfig";
import { collection, query, where, getDocs, collectionGroup } from 'firebase/firestore';
import { useEffect, useState } from "react";


const CertificationData = [
  {
    fullName: "John Queen",
    CertificateTitle: "Certificate A",
    ApprovedDate: "2021/12/12",
    ExpirationDate: "2022/3/12",
    Status: "Expired",
    CertificateLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    fullName: "Hello World",
    CertificateTitle: "Certificate B",
    ApprovedDate: "2023/02/15",
    ExpirationDate: "2023/10/15",
    Status: "Valid",
    CertificateLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
},
{
    fullName: "JavaIs Difficult",
    CertificateTitle: "Certificate C",
    ApprovedDate: "2023/02/15",
    ExpirationDate: "2023/10/15",
    Status: "Pending",
    CertificateLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
];

const AdminCertificateList = () => {
  const router = useRouter();

  const [certificatesList, setCertificatesList] = useState<any>([]);

  const getStudentInfoByUID = async (uid: string): Promise<any> => {
    try {
        const q = query(collection(firestore, 'users'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return { ...data };
        } else {
        return undefined;
        }
    } catch (error) {
        console.error('Error retrieving field:', error);
        return undefined;
    }
};


  const fetchAllSubmissions = async () => {
    const certificatesCollectionRef = collectionGroup(firestore, 'certificates');
    const querySnapshot = await getDocs(certificatesCollectionRef);

    const certificates:any = [];

    querySnapshot.forEach((certificateDoc) => {
        const certificateData = certificateDoc.data();
        certificates.push({
        userId: certificateDoc.ref.parent.parent?.id,
        certificateId: certificateDoc.id,
        ...certificateData,
        });
    });

    console.log(certificates);
    return certificates;
  };

  const logStudentInfo = async (uid:string) => {
    const studentInfo = await getStudentInfoByUID(uid);
    console.log("Student Info:", studentInfo);
  };

  useEffect(()=>{
    // Will give you json information of all certificate submission with uid
    setCertificatesList(fetchAllSubmissions());
    console.log("ReturnValue:", certificatesList);
    // Input uid as argument to retrieve student info
    logStudentInfo('zoYUpLFFN8VCTi5nBR55O4qID3r1');
  },[]);


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
                <th scope="col">
                  Full Name
                </th>
                <th scope="col" colSpan={2}>
                  Certificate Title
                </th>
                <th scope="col">Approved Date</th>
                <th scope="col">Expiration Date</th>
                <th scope="col">Status</th>
                <th scope="col">Download Certificate</th>
              </tr>
            </thead>
            <tbody>
              {CertificationData.map((cdata, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{cdata.fullName}</td>
                    <td colSpan={2}>{cdata.CertificateTitle}</td>
                    <td>{cdata.ApprovedDate}</td>
                    <td>{cdata.ExpirationDate}</td>
                    <td>{cdata.Status}</td>
                    <td><a href={cdata.CertificateLink}>Link</a></td>
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
