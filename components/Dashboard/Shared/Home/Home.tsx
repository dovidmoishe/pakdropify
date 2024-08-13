import React from "react";
import { IoIosAdd } from "react-icons/io";
import OrderTableComponent from "../OrderComponent";
import SearchInput from "../Input";
import { Tabs } from "@/components/ui/tabs";

function Home() {
  const tabs = [
    {
      title: "All orders",
      value: "All orders",
      content: <OrderTableComponent orderType={"all"} />,
    },
    {
      title: "Delivered",
      value: "Delivered",
      content: <OrderTableComponent orderType={"delivered"} />
    },

  ];
  return (
    <div className="">
      <SearchInput className="mb-3 " />

      <div
        className="flex flex-col md:flex-row items-center justify-between p-6 md:p-10 rounded-3xl space-y-4 md:space-y-0"
        style={{ backgroundColor: "#E3F2FD" }}
      >
        <span
          className=" text-lg md:text-xl font-medium text-center md:text-left "
          style={{ color: "#333333" }}
        >
          Manage your PakDropify Dashboard
        </span>
        <button className="relative p-[3px] group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg group-hover:opacity-90 transition-opacity duration-300" />
          <div className="px-8 py-2 bg-black rounded-lg relative text-white flex items-center gap-2 transition-colors duration-200 hover:bg-transparent">
            <IoIosAdd size={25} />
            <span>Create Order</span>
          </div>
        </button>
      </div>
      <div className="mt-7">
        <p className="text-left font-medium text-3xl mb-3">Your Orders</p>
      </div>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default Home;
