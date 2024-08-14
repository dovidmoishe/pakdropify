import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import OrderTableComponent from "../OrderComponent";
import SearchInput from "../Input";
import { Tabs } from "@/components/ui/tabs";
import CreateOrderModal from "../CreateOrderModal";
import ProfitsInformation from "./ProfitsInformation";

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
      content: <OrderTableComponent orderType={"delivered"} />,
    },
    {
      title: "In Transit",
      value: "In Transit",
      content: <OrderTableComponent orderType={"inTransit"} />,
    },
    {
      title: "Pending",
      value: "Pending",
      content: <OrderTableComponent orderType={"pending"} />,
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
        <CreateOrderModal />
      </div>
      <div className="mt-7">
        <ProfitsInformation />
      </div>
      <div className="mt-5">
        <p className="text-left font-medium text-3xl mb-3">Your Orders</p>
      </div>

      <div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
}

export default Home;
