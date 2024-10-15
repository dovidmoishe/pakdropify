import { databases } from "@/lib/appwrite";
import { useUser } from "@/lib/context/user";
import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";

type Props = {};

function ProfitsInformation({}: Props) {
  const { userTotalAmount, user } = useUser();
  const [transferred, setTransferred] = useState(0);
  const getUserData = async () => {
    if (user) {
      const userData = await databases.getDocument(
        "66c22b21001e7eea3fa7",
        "6706dfd9002ba4b2cdcf",
        user?.$id
      );
      setTransferred(userData.transferredToYou);
    }
  };
  useEffect(()=> {
    getUserData();
  },[transferred])

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-lg md:text-xl font-semibold">
          Remittance Information
        </p>
        {/* <span className="text-sm md:text-md font-light bg-gray-100 p-2 rounded-lg cursor-pointer">
          For 5 August 2024 - 11 August 2024
        </span> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-6 rounded-xl bg-slate-50 flex items-center gap-5 shadow-md">
          <FaCalendar size={40} className="text-gray-600" />
          <div className="flex flex-col">
            <p className="text-sm md:text-md">Will be transferred to you</p>
            <p className="text-lg md:text-xl text-green-500 flex gap-1">
              <span className="font-medium text-md">RM</span> {transferred}
            </p>
            
          </div>
          </div>


        <div className="p-6 rounded-xl bg-white shadow-md flex flex-col justify-center">
          <p className="text-sm md:text-md font-normal">
            Completed Orders: 10
            <br />
            <div className="flex gap-1">
              Total Profits: <span className="font-medium text-md">RM</span>{" "}
              {userTotalAmount}
            </div>
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfitsInformation;
