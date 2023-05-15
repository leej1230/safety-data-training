import Navbar from "@/components/Navbar";
import Head from "next/head";
import Link from "next/link";

const formVerticalMargin = "my-2";

const SignIn = () => {
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
              <Link
                className="btn btn-outline-dark"
                href="/updateinfo"
                role="button"
                style={{ textTransform: "none" }}
              >
                <img
                  width="20px"
                  style={{ marginBottom: "3px", marginRight: "5px" }}
                  alt="Google sign-in"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                />
                Login with Google
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
