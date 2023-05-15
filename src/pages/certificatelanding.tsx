import Navbar from "@/components/Navbar";
import Head from "next/head";
import { Button } from "@mui/material";
import { NoteAdd } from "@mui/icons-material";

const CertificationData = [
  {
    CertificateTitle: "Certificate A",
    ApprovedDate: "2021/12/12",
    ExpirationDate: "2022/3/12",
    Status: "Expired",
  },
  {
    CertificateTitle: "Certificate B",
    ApprovedDate: "2023/02/15",
    ExpirationDate: "2022/10/15",
    Status: "Valid",
  },
  {
    CertificateTitle: "Certificate C",
    ApprovedDate: "----/--/--",
    ExpirationDate: "----/--/--",
    Status: "Pending",
  },
];

const CertificateLanding = () => {
  return (
    <>
      <Head>
        <title>Certificate Landing</title>
      </Head>

      <Navbar />

      <main>
        <div className="text-center my-2">
          <h2>Welcome!</h2>
          <h2>Check Certificate Status Or Submit.</h2>
        </div>
        <div className="border mx-5 my-3">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" colSpan={2}>
                  Certificate Title
                </th>
                <th scope="col">Approved Date</th>
                <th scope="col">Expiration Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {CertificationData.map((cdata, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td colSpan={2}>{cdata.CertificateTitle}</td>
                    <td>{cdata.ApprovedDate}</td>
                    <td>{cdata.ExpirationDate}</td>
                    <td>{cdata.Status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="d-flex justify-content-center align-items-start m-3">
            <Button
              variant="contained"
              endIcon={<NoteAdd />}
              onClick={() => {
                window.location.href = "/uploadcertificate";
              }}
            >
              Submit New Acknowledgement
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default CertificateLanding;
