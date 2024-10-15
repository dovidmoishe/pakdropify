"use client";
import React, { useEffect, useState } from "react";
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
import { useUser } from "@/lib/context/user";
import { Popover } from "@headlessui/react";
import { IoInformationCircleSharp } from "react-icons/io5";

interface ProductInterface {
  sku: string;
  price: number;
}

const TooltipButton = () => {
  return (
    <div className="relative">
      <Popover className="relative">
        {/* Explicit button styling to ensure visibility */}
        <Popover.Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
          <IoInformationCircleSharp />
        </Popover.Button>

        {/* Popover panel with proper positioning */}
        <Popover.Panel className="absolute z-50 bg-white shadow-md border rounded-md p-4 w-64 left-0 mt-2">
          <p className="text-gray-700">
            <strong>Delivery Charges:</strong> Varies based on location.
          </p>
          <p className="text-gray-700">
            <strong>Service Fees:</strong> Includes packing, customer support,
            labor, printing, and other costs.
          </p>
        </Popover.Panel>
      </Popover>
    </div>
  );
};

export default function CreateOrderModal() {
  const { user } = useUser();
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [error, setError] = useState<string | null>(null); // Error state

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    sku: "",
    price: 0,
    address: "",
    postalcode: "",
    state: "",
    productPrice: 0,
  });

  // Fetch the product based on SKU
  useEffect(() => {
    const getProduct = async () => {
      if (!formData.sku) return; // Prevent fetch with empty SKU

      try {
        const product = await databases.getDocument(
          "66c22b21001e7eea3fa7", // Replace with your actual database ID
          "6709edb10037be41885d", // Replace with your collection ID
          formData.sku
        );

        setProduct({
          price: product.price,
          sku: product.$id,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null); // Reset if product not found
      }
    };

    getProduct();
  }, [formData.sku]);

  // Update formData when product price is available
  useEffect(() => {
    if (product) {
      setFormData((prevData) => ({
        ...prevData,
        price: product.price,
        productPrice: product.price,
      }));
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "price") {
      setError(null);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (Number(formData.price) < (product?.price ?? 0)) {
      setError("Selling price cannot be less than the product price.");
      return; // Prevent form submission if there's an error
    }


    try {
      let deliveryCharges = 10;
      let serviceCharges = 6;

      switch (formData.state) {
        case "Sabah":
        case "Sarawak":
        case "Labuan":
          deliveryCharges = 20;
          break;
        default:
          deliveryCharges = 10;
          break;
      }

      // You can now use deliveryCharges for further calculations, e.g.:
      const usersGain =
        Number(formData.price) -
        Number(product?.price ?? 0) -
        deliveryCharges -
        serviceCharges;
      await databases.createDocument(
        "66c22b21001e7eea3fa7",
        "670608d1001f19afde3a",
        ID.unique(),
        {
          customerName: formData.name,
          customerPhoneNumber: formData.phone,
          customerEmail: formData.email,
          productSku: formData.sku,
          sellingPrice: String(formData.price),
          customerAddress: formData.address,
          userId: user?.$id,
          type: "pending",
          amount: usersGain,
        }
      );

      alert(
        `Order created, waiting to be reviewed, Delivery charges are RM ${deliveryCharges}, while service charges are RM 6 Your total amount is RM ${usersGain}`
      );
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order, please try again.");
    }
  };

  return (
    <Modal>
      <ModalTrigger className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
          <div className="flex items-center gap-3">
            <IoIosAdd size={25} />
            <span>Create Order</span>
          </div>
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4 ">Customer Information</h2>
            <TooltipButton />
          </div>

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
                type="text"
                value={formData.sku}
                onChange={handleChange}
                required
              />
              {product && (
                <div className="text-md mt-2">
                  The price of the product is:{" "}
                  <strong>RM {product.price}</strong>
                </div>
              )}
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
               {error && <p className="text-red-500 mt-2">{error}</p>}
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
              {/* Add other states here */}
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
