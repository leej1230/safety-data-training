import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { auth, firestore, storage } from "../../lib/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, addDoc, collection, Timestamp } from "firebase/firestore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Upload from "@mui/icons-material/Upload";
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from 'dayjs';

const formVerticalMargin = "my-2";

const UploadCertificate = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File|null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [showTrainingName, setShowTrainingName] = useState(false);
  const [training, setTraining] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const getCurrentUserUid = () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      console.log("Current user UID:", uid);
      return uid;
    } else {
      console.log("No user is currently logged in.");
      router.push("/login");
      return null;
    }
  };

  const handleChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setShowTrainingName(selectedValue === "other");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    const uid = getCurrentUserUid();
  
    if (!selectedFile) {
      alert("Choose file!");
      return;
    }
  
    const uniqueFilename = `${Date.now()}_${selectedFile.name || "invalid"}`;
    const storageRef = ref(storage, 'certificates/' + uniqueFilename);
  
    try {
      await uploadBytes(storageRef, selectedFile);
      const pdfUrl = await getDownloadURL(storageRef);
  
      if (!selectedDate) {
        alert("Choose Date");
        return;
      }
  
      const submissionDate = Timestamp.fromDate(selectedDate.toDate());
  
      const certificateData = {
        pdf: pdfUrl,
        submissionDate: submissionDate,
        certificateName: showTrainingName ? training || "Other" : selectedOption,
        duration: 3,
        approveStatus: "Pending"
      };
      
      const certificatesCollectionRef = collection(firestore, 'certificates');
      if (uid) {
        const userDocRef = doc(certificatesCollectionRef, uid);
        const certificatesSubcollectionRef = collection(userDocRef, 'certificates');
        const newCertificateDocRef = await addDoc(certificatesSubcollectionRef, certificateData);
        router.push('/certificatelanding')
      } else {
        alert("Try re-login");
        return;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Undefined error has occured.");
    }
  };
  

  return (
    <>
      <Head>
        <title>Upload Certificate</title>
      </Head>

      <Navbar />

      <main>
        <div className="container my-5 align-items-center justify-content-center ">
          <div className="col ">
            <div className="row align-items-center justify-content-center">
              <h2 className="text-center my-3 mx-5">Upload the Certificate</h2>
            </div>
            <div className="row align-items-center justify-content-center">
              <div
                className="card bg-white px-4 py-4 border border-dark border-1"
                style={{ width: "fit-content" }}
              >
                <div className={`form-outline text-center`}>
                  <p>Training Name</p>
                  <TextField
                    label="Training Title"
                    select
                    variant="outlined"
                    value={selectedOption}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                  >
                    <MenuItem value="Training A">Training A</MenuItem>
                    <MenuItem value="Training B">Training B</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </div>

                {showTrainingName && (
                  <div
                    className={`form-outline text-center ${formVerticalMargin}`}
                  >
                    <p>Name of the Training (optional)</p>
                    <TextField
                      required
                      id="outlined-required"
                      label="Training Name"
                      placeholder="Doe"
                      value={training}
                      onChange={(event: any) => {setTraining(event.target.value)}}
                    />
                  </div>
                )}

                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
                  <p>Trained Date</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      value={selectedDate}
                      onChange={(date:any) => {setSelectedDate(date)}}
                    />
                  </LocalizationProvider>
                </div>

                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
                  <p>Upload File</p>
                  <form onSubmit={handleSubmit}>
                    <Input
                      type="file"
                      onChange={(e: any) => {
                        setSelectedFile(e.target.files[0]);
                      }}
                    />
                  </form>
                </div>

                <div className="text-center my-3">
                  <Button
                    variant="contained"
                    endIcon={<Upload />}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default UploadCertificate;