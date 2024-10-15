import React, { useEffect, useState } from "react";
import TransactionTableComponent from "./PaymentsTable";

type Props = {};

const Payments = (props: Props) => {
  const [data, setData] = useState({
    approvedTransactions: 0,
    declinedTransactions: 0,
    totalRevenue: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  // Mock fetch function (replace this with actual API call)
  const fetchPaymentsData = async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          approvedTransactions: 10,
          declinedTransactions: 10,
          totalRevenue: 1732,
          totalOrders: 25, // Change to 0 to test "No orders" scenario
        });
      }, 1000);
    });
  };

  useEffect(() => {
    const getData = async () => {
      const paymentData: any = await fetchPaymentsData();
      setData(paymentData);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="text-center">
        <span className="text-2xl font-semibold">Overview</span>
      </div>

      {/* <div className="flex items-center justify-between gap-4 mt-5">
        <div className="border-2 border-gray-100 py-3 rounded-xl px-5 w-full">
          <p className="text-slate-600 font-medium text-md">
            Approved Transactions
          </p>
          <p className="text-black text-xl">{data.approvedTransactions}</p>
        </div>
        <div className="border-2 border-gray-100 py-3 rounded-xl px-5 w-full">
          <p className="text-slate-600 font-medium text-md">
            Declined Transactions
          </p>
          <p className="text-black text-xl">{data.declinedTransactions}</p>
        </div>
        <div className="border-2 border-gray-100 py-3 rounded-xl px-5 w-full">
          <p className="text-slate-600 font-medium text-md">Total Revenue</p>
          <p className="text-black text-xl">
            <span className="font-medium text-md">RM</span> {data.totalRevenue}
          </p>
        </div>
        <div className="border-2 border-gray-100 py-3 rounded-xl px-5 w-full">
          <p className="text-slate-600 font-medium text-md">Total Orders</p>
          <p className="text-black text-xl">{data.totalOrders}</p>
        </div>
      </div> */}

      <div className="mt-7">
        <p className="text-xl font-bold">Transactions</p>
        <div className="mt-3">
          {data.totalOrders > 0 ? (
            <TransactionTableComponent />
          ) : (
            <p className="text-center text-slate-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;
