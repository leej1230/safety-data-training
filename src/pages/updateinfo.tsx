import Navbar from "@/components/Navbar";
import Head from "next/head";
import { TextField, Button } from "@mui/material";
import { Upload } from "@mui/icons-material";

const formVerticalMargin = "my-2";

const UpdateInfo = () => {
  return (
    <>
      <Head>
        <title>Info Update</title>
      </Head>

      <Navbar />

      <main>
        <div className="container my-5 d-flex align-items-center justify-content-center ">
          <div className="col ">
            <div className="row d-flex align-items-center justify-content-center">
              <h2 className="text-center my-3 mx-5">Update Your Profile</h2>
            </div>
            <div className="row d-flex align-items-center justify-content-center">
              <div
                className="card bg-white px-4 py-4 border border-dark border-1"
                style={{ width: "fit-content" }}
              >
                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    placeholder="Jane"
                  />
                </div>

                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
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
                  <TextField
                    required
                    id="outlined-required"
                    label="Major"
                    placeholder="Biomedical Engineering"
                  />
                </div>

                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="College"
                    placeholder="College of Letters and Science"
                  />
                </div>

                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="Group Name"
                    placeholder="BIG-RT, BIG-Reseach"
                  />
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

export default UpdateInfo;
