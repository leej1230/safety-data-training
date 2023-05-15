import React from 'react';
import Head from "next/head";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/components/Navbar";


const ContactPage: React.FC = () => {
    return (
        <>
      <Head>
        <title>Info Update</title>
      </Head>

      <Navbar />

      <main className="mt-5 text-center vh-100">
        <h1>Contact</h1>
        <div className="container my-5">
          <div className="row">
            <div className="col text-left">
              <p className="fs-5">Andrew Yao</p>
              <p className="fs-5">Lab Manager & Molecular/Biological Prototyping Mentor</p>
              <p className="fs-5">aiyao@ucdavis.edu</p>
            </div>
            <div className="col text-right">
              <p className="fs-5">Enmian Chang</p>
              <p className="fs-5">BIG Co-President & Safety Training Database Mentor</p>
              <p className="fs-5">enmchang@ucdavis.edu</p>
            </div>
          </div>
        </div>
      </main>

    </>
     
    );
  };
  
  export default ContactPage;
