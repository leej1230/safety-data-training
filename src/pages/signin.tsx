import Navbar from "@/components/Navbar";
import Head from "next/head";
import {firebaseApp, auth, firestore, provider} from "../../lib/FirebaseConfig";
import GoogleButton from "react-google-button";
import { signInWithPopup } from "firebase/auth";
import {useRouter} from 'next/router';
import { getDoc, doc } from "firebase/firestore";

const SignIn = () => {
  const router = useRouter();

  const checkUserExists = async (uid:string) => {
    try {
      const userDocRef = doc(firestore, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
      // const userDoc = await getDoc(collection(firestore,"users",uid));
      // const userDoc = await firestore.collection('users').doc(uid).get();
      return userDocSnap.exists;
    } catch (error) {
      console.log('Error checking user information:', error?.toString());
      return false;
    }
  };

  const handleGoogleSignIn = async () =>{
    try {
      const result = await signInWithPopup(auth,provider);
      const userExists = await checkUserExists(result.user.uid);
      if(userExists){
        router.push('/updateinfo');
      } else {
        router.push('/certificatelanding');
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      <Navbar />

      <main>
        <div className="container my-5 d-flex flex-column align-items-center justify-content-center text-center">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5ce457b010282600010135f2/1559082496575-KJS85T7I91BXO784LNZL/58847423_2006391886337279_1749835535418916864_n.png"
            style={{ maxWidth: "10%" }}
          />
          <h2>Sign In</h2>
          <h3>
            with your <strong style={{ fontWeight: "bold" }}>UC Davis</strong>{" "}
            email
          </h3>
          <div className="row">
            <div>
              <GoogleButton onClick={handleGoogleSignIn}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
