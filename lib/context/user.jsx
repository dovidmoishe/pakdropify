import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account, databases } from "../appwrite";

export const UserContext = createContext();


export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider(props) {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    setUser(loggedIn);
    window.location.replace("/dashboard"); // you can use different redirect method for your application
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(firstname, lastname, email, password, phoneNumber, iban, cnicNumber, bankName, bankAccountTitle, bankAccountNumber) {
    const userId = ID.unique()
    const name = `${firstname} ${lastname}`
    await account.create(userId, email, password, name);
    const extraUserData =  {
      phoneNumber: phoneNumber,
      cnicNumber: cnicNumber,
      bankName: bankName,
      bankAccountTitle: bankAccountTitle,
      iban: iban,
      bankAccountNumber: bankAccountNumber,
    }
    console.log("Creating document with data:", extraUserData);
    await databases.createDocument('66c22b21001e7eea3fa7', '6706dfd9002ba4b2cdcf', userId, extraUserData)
    await login(email, password);
  }

  async function init() {
    try {
      const loggedIn = await account.get();

      setUser(loggedIn)
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register }}>
      {props.children}
    </UserContext.Provider>
  );
}