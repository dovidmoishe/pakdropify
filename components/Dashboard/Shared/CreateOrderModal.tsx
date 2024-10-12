"use client";
import React, { useContext,useEffect, useState } from "react";

import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import { IoIosAdd } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { UserContext } from "@/lib/context/user";

const product_and_prices = [
  {
    sku: 1234,
    price: 50,
  },
]; 

export default function CreateOrderModal() {
  const {current} = useContext(UserContext)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    sku: 0,
    price: 0,
    address: "",
    postalcode: "",
    state: "",
    productPrice: 0,
  });

  useEffect(() => {
    const selectedProduct = product_and_prices.find(
      (product) => product.sku == formData.sku
    );
    setFormData((prevData) => ({
      ...prevData,
      productPrice: selectedProduct ? selectedProduct.price : 0,
    }));
  }, [formData.sku]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Form submission logic here
    console.log("Form Data Submitted:", formData);
    await databases.createDocument('66c22b21001e7eea3fa7', '670608d1001f19afde3a', ID.unique(), {
      customerName:  formData.name,
      customerPhoneNumber: formData.phone,
      customerEmail:  formData.email,
      productSku:  formData.sku,
      sellingPrice:   formData.price,
      customerAddress:   formData.address,
      userId: current.$id
    })
  };

  return (
    <Modal>
      <ModalTrigger className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          <div className="flex items-center gap-3">
            <IoIosAdd size={25} />
            <span>Create Order</span>
          </div>
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Customer Information
          </h2>
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="phone">Customer Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+60 123-456789"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Customer Email Address (Optional)</Label>
              <Input
                id="email"
                placeholder="johndoe@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="sku">Product SKU</Label>
              <Input
                id="sku"
                placeholder="1234"
                type="number"
                value={formData.sku}
                onChange={handleChange}
                required
              />
              <div
                className={`text-red-600 flex gap-2 ${
                  formData.sku == 0 ? "invisible" : "visible"
                } `}
              >
                The price of the product is:
                <p className="font-normal text-md flex">RM {formData.productPrice}</p>
              </div>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="price">Selling Price</Label>
              <Input
                id="price"
                placeholder="100.00"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="address">Customer Address</Label>
              <Input
                id="address"
                placeholder="123 Main Street"
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="postalcode">Postal Code</Label>
              <Input
                id="postalcode"
                placeholder="12345"
                type="text"
                value={formData.postalcode}
                onChange={handleChange}
                required
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="state">State</Label>
              <select
                id="state"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                value={formData.state}
                onChange={handleChange}
                required
              >
                <option value="">Select a state</option>
                <option value="Johor">Johor</option>
                <option value="Kedah">Kedah</option>
                <option value="Kelantan">Kelantan</option>
                <option value="Melaka">Melaka (Malacca)</option>
                <option value="Negeri Sembilan">Negeri Sembilan</option>
                <option value="Pahang">Pahang</option>
                <option value="Perak">Perak</option>
                <option value="Perlis">Perlis</option>
                <option value="Pulau Pinang">Pulau Pinang (Penang)</option>
                <option value="Sabah">Sabah</option>
                <option value="Sarawak">Sarawak</option>
                <option value="Selangor">Selangor</option>
                <option value="Terengganu">Terengganu</option>
                <option value="Kuala Lumpur">Kuala Lumpur</option>
                <option value="Labuan">Labuan</option>
                <option value="Putrajaya">Putrajaya</option>
              </select>
            </LabelInputContainer>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
