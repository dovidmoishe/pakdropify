"use client";
import React from "react";

type Order = {
  trackingId: string;
  name: string;
  phoneNumber: string;
  deliveryStatus: string;
  amount: number;
};

type OrderTableProps = {
  orders: Order[];
};

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white ">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tracking ID
            </th>
            <th className="px-6 py-3 border-b   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer Name
              </th>
            <th className="px-6 py-3 border-b   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer's Phone Number
            </th>
            <th className="px-6 py-3 border-b  text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 border-b   text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Delivery Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4  text-sm text-gray-700">
                {order.trackingId}
              </td>
              <td className="px-6 py-4  text-sm text-gray-700">
                {order.name}
              </td>
              <td className="px-6 py-4  text-sm text-gray-700">
                {order.phoneNumber}
              </td>
              <td className="px-6 py-4  text-sm text-gray-700 flex gap-1">
                <span className="font-medium text-md">RM</span>
                {order.amount}
              </td>
              <td className="px-6 py-4  text-sm text-gray-700">
                {order.deliveryStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example usage with dummy data
const DelveredOrders: Order[] = [
  {
    trackingId: "123456789",
    name: "John Doe",
    phoneNumber: "+1 234 567 890",
    deliveryStatus: "Delivered",
    amount: 75,
  },
];
const InTransitOrders: Order[] = [
  {
    trackingId: "987654321",
    name: "Jane Smith",
    phoneNumber: "+1 987 654 321",
    deliveryStatus: "In Transit",
    amount: 65,
  },
];
const PendingOrders: Order[] = [
  {
    trackingId: "564738291",
    name: "Alice Johnson",
    phoneNumber: "+1 564 738 291",
    deliveryStatus: "Pending",
    amount: 50,
  },
];
const orders = [...DelveredOrders, ...InTransitOrders, ...PendingOrders];

const sortOrders = () => "";
type IOrderTableComponent = {
  orderType: String;
};
const OrderTableComponent: React.FC<IOrderTableComponent> = ({ orderType }) => {
  let content;
  if (orderType == "all") {
    content = <OrderTable orders={orders} />;
  } else if (orderType == "delivered") {
    content = <OrderTable orders={DelveredOrders} />;
  } else if (orderType == "inTransit") {
    content = <OrderTable orders={InTransitOrders} />;
  } else if (orderType == "pending") {
    content = <OrderTable orders={PendingOrders} />;
  }
  return <>{content}</>;
};
export default OrderTableComponent;
