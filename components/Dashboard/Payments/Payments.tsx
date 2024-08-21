import React from "react";
import TransactionTableComponent from "./PaymentsTable";

type Props = {};

const Payments = (props: Props) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">Overview</span>
        <button className="outline-none p-3 rounded-full border-none bg-black text-white">
          New Payment
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 mt-5">
        <div className=" border-2 border-gray-100 py-3 rounded-xl  px-5 w-full">
          <p className="text-slate-600 font-medium text-md">
            Approved Transactions
          </p>
          <p className="text-black text-xl">10</p>
        </div>
        <div className=" border-2 border-gray-100 py-3 rounded-xl  px-5 w-full">
          <p className="text-slate-600 font-medium text-md">
            Declined Transactions
          </p>
          <p className="text-black text-xl">10</p>
        </div>
        <div className=" border-2 border-gray-100 py-3 rounded-xl  px-5 w-full">
          <p className="text-slate-600 font-medium text-md">Total Revenue</p>
          <p className="text-black text-xl">
            <span className="font-medium text-md">RM</span> 1,732
          </p>
        </div>
        <div className=" border-2 border-gray-100 py-3 rounded-xl  px-5 w-full">
          <p className="text-slate-600 font-medium text-md">Total Orders</p>
          <p className="text-black text-xl">25</p>
        </div>
      </div>

      <div className="mt-7">
        <p className="text-xl font-bold">Transactions</p>
        <div className="mt-3">
          <TransactionTableComponent />
        </div>
      </div>
    </div>
  );
};

export default Payments;
