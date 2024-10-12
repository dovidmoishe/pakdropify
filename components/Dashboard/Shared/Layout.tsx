import HeroSection from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
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
import { FiMessageSquare } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Home from "../Home/Home";
import CreateOrderModal from "./CreateOrderModal";
import AccountDetails from "../Account/Account";
import Orders from "../Orders/Orders";
import TicketForm from "../Tickets/Tickets";
import Payments from "../Payments/Payments";
import { UserContext } from "@/lib/context/user";

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
      component: <Orders />,
    },
    {
      label: "Payments",
      href: "#",
      icon: (
        <MdOutlinePayments className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <Payments />,
    },
    {
      label: "Tickets",
      href: "#",
      icon: (
        <TiMessages className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <TicketForm />
        </div>
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      component: <AccountDetails />,
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => logout(), // Call logout when clicked
    },
  ];

  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const { logout } = useContext(UserContext); // Get logout function from UserContext

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
                    <CreateOrderModal />
                  </div>
                )}
                {links.map((link, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActivePage(link.label);
                      link.onClick && link.onClick(); // Call the link's onClick if defined
                    }}
                    className="cursor-pointer"
                  >
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>
            </div>

          </SidebarBody>
        </Sidebar>
      </div>
      <div className="flex-1 h-full overflow-auto bg-white">
        <div className="p-8">
          {/* Render the selected component */}
          {links.find((link) => link.label === activePage)?.component}
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded-full shadow-lg"
          onClick={() => setActivePage("Tickets")}
        >
          <FiMessageSquare />
        </button>
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
      <Image src={Pakdropify} width={100} height={100} alt="PakDropify Logo" />
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
