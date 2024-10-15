"use client";
import { databases } from "@/lib/appwrite";
import React, { useEffect, useState } from "react";
import { useUser } from "@/lib/context/user";
import { Query } from "appwrite";

type Order = {
  customerName: string;
  customerEmail: string;
  customerPhoneNumber: string;
  type: string;
  orderId: string;
  amount: number;
};

type OrderTableProps = {
  orders: Order[];
};

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer's Phone Number
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer Email
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 border-b text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Delivery Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{order.orderId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.customerName}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.customerPhoneNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.customerEmail}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <span className="font-medium text-md">RM </span>
                  {order.amount}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{order.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

type IOrderTableComponent = {
  orderType: string;
};

const OrderTableComponent: React.FC<IOrderTableComponent> = ({ orderType }) => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // To prevent refetching

  const populateOrders = async () => {
    if (user && orders.length === 0) { // Only fetch orders if they haven't been fetched already
      setLoading(true);
      const ordersByUser = await databases.listDocuments(
        "66c22b21001e7eea3fa7",
        "670608d1001f19afde3a",
        [Query.equal("userId", user.$id)]
      );
      const userOrders = ordersByUser.documents.map((doc: any) => ({
        orderId: doc.$id,
        customerName: doc.customerName,
        customerEmail: doc.customerEmail,
        customerPhoneNumber: doc.customerPhoneNumber,
        type: doc.type,
        amount: doc.amount,
      }));
      setOrders(userOrders);
      setLoading(false); // Once fetched, stop loading
    }
  };

  useEffect(() => {
    populateOrders();
  }, [user]); // Fetch once when the user is available

  // Filtering the orders by type based on the active tab
  const filteredOrders =
    orderType === "all"
      ? orders
      : orders.filter((order) => order.type === orderType);

  return (
    <>
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : (
        <OrderTable orders={filteredOrders} />
      )}
    </>
  );
};

export default OrderTableComponent;
