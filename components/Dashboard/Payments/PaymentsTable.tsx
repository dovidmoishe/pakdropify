"use client";
import React from "react";

type CustomerTransaction = {
  customerId: string;
  type: string;
  status: string;
  transactionDate: string;
  amount: number;
};

type TransactionTableProps = {
  transactions: CustomerTransaction[];
};

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer ID
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Transaction Date
            </th>
            <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">
                {transaction.customerId}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {transaction.type}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {transaction.status}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {transaction.transactionDate}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 flex gap-1">
                <span className="font-medium text-md">RM</span>
                {transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example usage with dummy data
const transactions: CustomerTransaction[] = [
  {
    customerId: "C001",
    type: "Purchase",
    status: "Completed",
    transactionDate: "2024-08-15",
    amount: 150,
  },
  {
    customerId: "C002",
    type: "Refund",
    status: "Pending",
    transactionDate: "2024-08-16",
    amount: 100,
  },
  {
    customerId: "C003",
    type: "Purchase",
    status: "Failed",
    transactionDate: "2024-08-17",
    amount: 75,
  },
];

const TransactionTableComponent: React.FC = () => {
  return <TransactionTable transactions={transactions} />;
};

export default TransactionTableComponent;
