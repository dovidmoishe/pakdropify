import { ID, Models, Query } from "appwrite";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { account, databases } from "../appwrite";

// Define the interface for the user context

interface userCollectionInterface extends Models.Document {
  phoneNumber: string,
  cnicNumber: string,
  bankName: string,
  bankAccountNumber: string,
  bankAccountTitle: string,
  iban: string,
  transferredToYou: number
}

interface AuthContextInterface {
  userTotalAmount: number | null;
  user:Models.User<Models.Preferences> | null;
  current: Models.Session | null;
  userVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phoneNumber: string,
    iban: string,
    cnicNumber: string,
    bankName: string,
    bankAccountTitle: string,
    bankAccountNumber: string,
    interestReason:string
  ) => Promise<void>;
}

// Create the context
const UserContext = createContext<AuthContextInterface | undefined>(undefined);

// Hook to use the User context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component
export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [userActive, setUserActive] = useState<Models.Session | null>(null);
  const [userVerified, setUserVerified] = useState<boolean>(false);
  const [userTotalAmount, setUserTotalAmount] = useState<number | null>(null)
  const [userCollection, setUserCollection] = useState<any>()

  // Login function
  async function login(email: string, password: string) {
    
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUserActive(loggedIn);
  }

  // Logout function
  async function logout() {
    await account.deleteSession("current");
    setUserActive(null);
  }

  // Register function
  async function register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phoneNumber: string,
    iban: string,
    cnicNumber: string,
    bankName: string,
    bankAccountTitle: string,
    bankAccountNumber: string,
    interestReason: string
  ) {

    const randomString = Math.random().toString(36).substring(2, 15);

    const name = `${firstname} ${lastname}`;
    const userId = `${name.replace(/[^a-zA-Z0-9.-_]/g, "").toLowerCase()}_${randomString}`
    await account.create(userId, email, password, name);
    const extraUserData = {
      phoneNumber,
      cnicNumber,
      bankName,
      bankAccountTitle,
      iban,
      bankAccountNumber,
      interestReason
    };
    console.log("Creating document with data:", extraUserData);
    await databases.createDocument('66c22b21001e7eea3fa7', '6706dfd9002ba4b2cdcf', userId, extraUserData);
    await login(email, password);
  }

  // Initialize user session
  async function init() {
    try {
      const loggedInUser = await account.get();
      setUser(loggedInUser);
      if(loggedInUser.emailVerification) {
        setUserVerified(!userVerified);
        const userData = await databases.getDocument(
          '66c22b21001e7eea3fa7',
          '6706dfd9002ba4b2cdcf',
          loggedInUser.$id
        )
      } 

      if(loggedInUser) {
        const userOrdersAmount = await databases.listDocuments(
          '66c22b21001e7eea3fa7',
          '670608d1001f19afde3a',
          [
            Query.equal('userId', loggedInUser.$id),
            Query.select(['amount']),
            Query.equal('type', 'delivered')
          ]
        )
        const amounts = userOrdersAmount.documents.map(doc => doc.amount);
        const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);
        setUserTotalAmount(totalAmount)
      }

    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{  userTotalAmount, current: userActive, user, userVerified, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
}
