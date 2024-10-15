"use client";
import { databases } from "@/lib/appwrite";
import { useUser } from "@/lib/context/user";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";

type CustomerTransaction = {
  customerId: string;
  type: string;
  transactionDate: string;
  amount: number;
};

type TransactionTableProps = {
  transactions: CustomerTransaction[];
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
}) => {
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

// Example usage with dummy dat
const TransactionTableComponent: React.FC = () => {
  const [transactions, setTransactions] = useState<CustomerTransaction[]>([])
  const { user } = useUser();
  const fillTransactions = async () => {
    if (user) {
      const transactions = await databases.listDocuments(
        "66c22b21001e7eea3fa7",
        "670d57f60039702f0f5b",
        [Query.equal("userId", user?.$id)]
      );
      const purgedTransactions = transactions.documents.map((doc) => {
        return {
          customerId: user.$id,
          amount: doc.amount,
          transactionDate: doc.$createdAt,
          type: 'payment'
        };
      });
      setTransactions(purgedTransactions)
    }
  };
  useEffect(() => {

  }, [])
  return <TransactionTable transactions={transactions} />;
};

export default TransactionTableComponent;
