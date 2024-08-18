import React from "react";
import Image from "next/image";
import { FileUpload } from "@/components/ui/file-upload";
import { FaRegTrashCan } from "react-icons/fa6";

type Props = {};

const AccountDetails = (props: Props) => {
  return (
    <div>
      <div className="flex flex-col items-center md:flex-row justify-start border-2 border-gray-200 rounded-md p-4 md:py-9 gap-4 md:gap-6">
        <Image
          src="https://assets.aceternity.com/manu.png"
          width={150}
          height={150}
          alt="Profile picture"
          className="rounded-full w-24 h-24 md:w-24 md:h-24"
        />
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <FileUpload />
          <button className="flex items-center gap-2 px-4 py-2 md:px-8 md:py-1 bg-white text-black border border-black rounded-md font-light transition duration-200 ease-in-out hover:bg-black hover:text-white">
            <FaRegTrashCan className="h-5 w-5" />
            Remove
          </button>
        </div>
      </div>
      <div className="border-2 border-gray-200 rounded-md mt-3 p-4">
      <form className="flex flex-col gap-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your name"
          />
        </div>

        {/* Language Input */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <input
            type="text"
            id="language"
            name="language"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your language"
          />
        </div>

        {/* Country Dropdown */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            name="country"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled selected>
              Select your country
            </option>
            <option value="malaysia">Malaysia</option>
            <option value="pakistan">Pakistan</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-4">
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AccountDetails;
