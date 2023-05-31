import Navbar from "@/components/Navbar";
import Head from "next/head";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/router';
import GoogleButton from "react-google-button";
import { auth, provider } from "../../lib/FirebaseConfig";

const SignIn = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/certificatelanding');
    } catch (error) {
      console.log('Error signing in with Google:', error);
    }
  };

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
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
