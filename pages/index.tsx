import HeroSection from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { account } from "@/lib/appwrite";

export default function Home() {
  const [userVerified, setUserVerified] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeSession, setActiveSession] = useState(false)
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  const populateAccount = async () => {
    
    try {
      const sessionId = "current"
      const activeSession = await account.getSession(sessionId)
      
      if(activeSession) {
        const currentAccount = await account.get()
        return {
          verified: currentAccount.emailVerification,
          user: currentAccount,
          activeSession: true
        };
      }
    } catch (error) {
      console.error("Error fetching account: ", error);
      return null; // Return null if no user is logged in or an error occurs
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = await populateAccount();
      
      if (userData?.activeSession == true) {
        setCurrentUser(userData.user);
        setUserVerified(userData.verified);
        setActiveSession(true)

        // Only redirect if the user is verified
        if (userData.verified) {
          router.push("/dashboard");
        }
      }

      // Ensure loading is set to false regardless
      setLoading(false);
    };

    getUserData();
  }, [router]);

  // Show a loading state while fetching the user data
  if (loading) {
    return <div>Loading...</div>; // Simple loading indicator
  }

  return (
    <>
      {
        activeSession && !userVerified ? (
          <>
          <Navbar />
          <HeroSection isVerifiedAccount={true}/>
        </>
        ) :(
          <>
          <Navbar />
          <HeroSection isVerifiedAccount={false}/>
        </>
        )
      }
    </>
  );
}
