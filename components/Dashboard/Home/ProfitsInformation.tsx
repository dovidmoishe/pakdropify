import React from "react";
import { FaCalendar } from "react-icons/fa";

type Props = {};

function ProfitsInformation({}: Props) {
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-lg md:text-xl font-semibold">Remittance Information</p>
        <span className="text-sm md:text-md font-light bg-gray-100 p-2 rounded-lg cursor-pointer">
          For 5 August 2024 - 11 August 2024
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-6 rounded-xl bg-slate-50 flex items-center gap-5 shadow-md">
          <FaCalendar size={40} className="text-gray-600" />
          <div className="flex flex-col">
            <p className="text-sm md:text-md">Will be transferred to you</p>
            <p className="text-lg md:text-xl text-green-500 flex gap-1"><span className='font-medium text-md'>RM</span> 1,250</p>
            <p className="text-xs md:text-sm text-gray-500">
              Last updated on 04 August 11:59PM
            </p>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white shadow-md flex flex-col justify-center">
          <p className="text-sm md:text-md font-normal">
            Completed Orders: 10
            <br />
            <div className="flex gap-1">Total Profits: <span className='font-medium text-md'>RM</span> 1000</div>
            <div className="flex gap-1">Transferred to you: <span className='font-medium text-md'>RM</span> 0</div>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfitsInformation;
