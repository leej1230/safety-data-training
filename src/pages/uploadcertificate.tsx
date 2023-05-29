import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { auth } from "../../lib/FirebaseConfig";
import { TextField, Button, Input, MenuItem, Select } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const formVerticalMargin = "my-2";

const UploadCertificate = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [showTrainingName, setShowTrainingName] = useState(false);
  const [training, setTraining] = useState("");

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

  const handleTrainingChange = (event: any) => {
    setTraining(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(selectedFile);
    console.log(training);
    // Do something with the selected file and training value, e.g. upload it to a server
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
                      onChange={handleTrainingChange}
                    />
                  </div>
                )}

                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
                  <p>Trained Date</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker />
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
