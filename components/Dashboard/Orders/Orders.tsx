import React from "react";
import OrderTableComponent from "../Shared/OrderComponent";
import SearchInput from "../Shared/Input";
import { Tabs } from "@/components/ui/tabs";

type Props = {};

const Orders = (props: Props) => {
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
    <div>
      {/* <SearchInput className="mb-3 " /> */}

      <div className="h-[20rem] md:h-[40rem]  flex flex-col max-w-5xl w-full  items-start mt-3 ">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default Orders;
