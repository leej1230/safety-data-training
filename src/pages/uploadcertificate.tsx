import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { TextField, Button, Input, MenuItem, Select } from "@mui/material";
import { Upload } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const formVerticalMargin = "my-2";

const UploadCertificate = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleFileInput = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(selectedFile);
    // Do something with the selected file, e.g. upload it to a server
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
                    <MenuItem value="option1">Training A</MenuItem>
                    <MenuItem value="option2">Training B</MenuItem>
                    <MenuItem value="option3">Training C</MenuItem>
                  </TextField>
                </div>

                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
                  <p>Name of the Training (optional)</p>
                  <TextField
                    required
                    id="outlined-required"
                    label="Last Name"
                    placeholder="Doe"
                  />
                </div>

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
                    <Input type="file" onChange={handleFileInput} />
                  </form>
                </div>

                <div className="text-center my-3">
                  <Button variant="contained" endIcon={<Upload />}>
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
