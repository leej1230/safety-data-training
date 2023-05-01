import { useRouter } from "next/router";

const userData = {
  given_name: "Jane",
  family_name: "Doe",
  name: "Jane Doe",
  email: "jd2001@ucdavis.edu",
  student_id: 200101230,
};

const Profile = () => {
  const router = useRouter();
  const { uid } = router.query;

  // Render starts from below here
  return (
    <>
      <p>Welcome! {uid}</p>
    </>
  );
};

export default Profile;
