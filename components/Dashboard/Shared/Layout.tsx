"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar";
import Pakdropify from "@/public/pakdropify.png";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { MdHistory, MdOutlinePayments } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { TiMessages } from "react-icons/ti";
import Link from "next/link";
import Image from "next/image";
import Home from "./Home/Home";

export function Layout() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <Home />,
    },
    {
      label: "Order History",
      href: "#",
      icon: (
        <MdHistory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Payments",
      href: "#",
      icon: (
        <MdOutlinePayments className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Tickets",
      href: "#",
      icon: (
        <TiMessages className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex-shrink-0">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="flex flex-col justify-between gap-10 h-full">
            <div className="flex flex-col flex-1 overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col items-start gap-2">
                {/* Conditionally render the button based on the `open` state */}
                {open && (
                  <div className="px-4 transition-opacity duration-300">
                    <button
                      onClick={() => setActivePage("Create Order")}
                      className="px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transition-transform transform hover:-translate-y-1 flex items-center gap-3"
                    >
                     <IoIosAdd /> Create Order
                    </button>
                  </div>
                )}
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePage(link.label)}
                    className="cursor-pointer"
                  >
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <Image
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 flex-shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      <div className="flex-1 h-full overflow-auto bg-white">
        <div className="p-8">
          {/* Render the selected component */}
          {activePage === "Create Order" ? (
            <CreateOrderComponent />
          ) : (
            links.find((link) => link.label === activePage)?.component
          )}
        </div>
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal space-x-2 text-sm text-black py-1 relative z-20"
    >
      <Image src={Pakdropify} width={70} height={70} alt="PakDropify Logo" />
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src={Pakdropify} width={100} height={100} alt="Pakdropify" />
    </Link>
  );
};

// Dummy components for demonstration purposes
const Dashboard = () => {
  return <div>Dashboard Content</div>;
};

const CreateOrderComponent = () => {
  return <div>Create Order Page</div>;
};
