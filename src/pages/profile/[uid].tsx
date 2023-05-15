import { useRouter } from "next/router";
import React from 'react';
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/components/Navbar";

const userData = {
  given_name: "Jane",
  family_name: "Doe",
  name: "Jane Doe",
  email: "jd2001@ucdavis.edu",
  student_id: 200101230,
};

const Profile = () => {
  const router = useRouter();
  const { uid } = router.query;

  // Render starts from below here
  return (
    <>
      <Head>
        <title>Info Update</title>
      </Head>

      <Navbar />
      <div className="text-center vh-100" style={{ marginTop: '50px' }}>
        <div className="d-inline-block bg-light rounded p-2" >
          <p className="m-0 fs-3">Welcome {userData.given_name} {userData.family_name} !</p>
        </div>
      </div>

      <div className="text-center" style={{ marginTop: '-700px' }}>
        <div className="d-inline-block bg-light rounded p-2" >
          <p className="m-0 fs-3">Student ID:  {userData.student_id}</p>
          <p className="m-0 fs-3">UC Davis Email:  {userData.email}</p>
          <p className="m-0 fs-3">Affiliations: </p>
          <p className="m-0 fs-3"> BIG RT Fall 2022</p>
          <p className="m-0 fs-3"> BIG LIFT Winter - Spring 2023</p>
        </div>
      </div>

      <div className="text-center mt-3">
        <div className="d-inline-block bg-light rounded p-2" >
          <p className="m-0 fs-3">View Certificate</p>
        </div>
      </div>

      <div className="text-center mt-3">
        <div className="d-inline-block bg-light rounded p-2" >
          <p className="m-0 fs-3">Submit Certificate</p>
        </div>
      </div>

    </>
    
  );
};

export default Profile;
