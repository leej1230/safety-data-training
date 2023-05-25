import Navbar from "@/components/Navbar";
import Head from "next/head";
import { TextField, Button } from "@mui/material";
import {firebaseApp, auth, firestore, provider} from "../../lib/FirebaseConfig";
import { Upload } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const formVerticalMargin = "my-2";

const UpdateInfo = () => {
  const router = useRouter();
  const [uid, setUid]             = useState("");
  const [major, setMajor]         = useState("");
  const [college, setCollege]     = useState("");
  const [groupName, setGroupName] = useState("");


  const getCurrentUserUid = () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      console.log('Current user UID:', uid);
      return uid;
    } else {
      console.log('No user is currently logged in.');
      router.push('/login')
      return null;
    }
  };
  
  useEffect(() => {
    const getuid = getCurrentUserUid();
    if(getuid){
      setUid(getuid);
    } else {
      console.log('Error of fetching user id.');
      router.push('/login')
    }
  }, []);

  const handleSubmit = async () => {
    try{
      await addDoc(collection(firestore, 'users'), {
        uid: uid,
        major: major,
        college: college,
        groupName: groupName,
      });
    } catch(error) {
      console.log("value couldn't be uploaded due to error: ", error?.toString());
    }
    return
  }

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
                {/* <div
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
                </div> */}

                <div
                  className={`form-outline text-center ${formVerticalMargin}`}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="Major"
                    placeholder="Biomedical Engineering"
                    onChange={(event) => setMajor(event.target.value)}
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
                    onChange={(event) => setCollege(event.target.value)}
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
                    onChange={(event) => setGroupName(event.target.value)}
                  />
                </div>

                <div className="text-center my-3">
                  <Button
                    variant="contained"
                    endIcon={<Upload />}
                    onClick={() => {
                      handleSubmit();
                      router.push('/certificatelanding');
                    }}
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

export default UpdateInfo;
