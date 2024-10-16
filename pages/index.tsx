import HeroSection from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { account } from "@/lib/appwrite";
import { useUser } from "@/lib/context/user";
import { FaTruckMedical } from "react-icons/fa6";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeSession, setActiveSession] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  const { user, userVerified } = useUser();

  const populateAccount = async () => {
    return {
      verified: user?.emailVerification,
      user: user,
      activeSession: user?.status,
    };
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await populateAccount();

      if (userVerified) {
        router.push("/dashboard"); // Redirect to dashboard if verified
      }

      if (userData?.activeSession) {
        setCurrentUser(userData.user);
        setActiveSession(true);
      }

      setLoading(false); // Ensure loading is set to false after fetching data
    };

    getUserData();
  }, [router, userVerified]); // Make sure useEffect depends on `userVerified`

  // Show a loading state while fetching the user data
  if (loading) {
    return <div>Loading...</div>; // Simple loading indicator
  }

  return (
    <>
      {activeSession && !userVerified ? (
        <>
          <Navbar />
          <HeroSection isVerifiedAccount={true} />
        </>
      ) : (
        <>
          <Navbar />
          <HeroSection isVerifiedAccount={false} />
        </>
      )}
    </>
  );
}
