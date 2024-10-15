import React, { useContext, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/context/user";

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string; // New field
  cnicNumber: string; // New field
  bankName: string; // New field
  bankAccountTitle: string; // New field
  bankAccountNumber: string; // New field
  iban: string; // New field
}

interface LoginValues {
  email: string;
  password: string;
}

interface HeroSectionProps {
  isVerifiedAccount: boolean; // Determines if the user is verified
}

const HeroSection: React.FC<HeroSectionProps> = ({ isVerifiedAccount }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "", // New field
    cnicNumber: "", // New field
    bankName: "", // New field
    bankAccountTitle: "", // New field
    bankAccountNumber: "", // New field
    iban: "", // New field
  });

  const [loginValues, setLoginValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true); // To toggle between login and signup

  const { register, login } = useUser()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      email,
      password,
      bankName,
      bankAccountNumber,
      bankAccountTitle,
      iban,
      phoneNumber,
      cnicNumber,
    } = formValues;

    if (register) {
      await register(
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        iban,
        cnicNumber,
        bankName,
        bankAccountTitle,
        bankAccountNumber
      );
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginValues;

    if (login) {
      await login(email, password);
    }
  };

  const handleToggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-800 text-white text-center">
      <div className="space-y-6">
        <h1 className="text-6xl font-bold">PakDropify</h1>

        {isVerifiedAccount ? (
          <div className="text-xl">
            Your account is awaiting approval from admins.
          </div>
        ) : (
          <>
            <p className="text-xl font-light max-w-lg mx-auto">
              Manage your dropshipper dashboard with ease and efficiency.
              Streamline your operations and boost productivity with our
              powerful tools.
            </p>
            <Modal>
              <ModalTrigger className="px-8 py-3 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                Signup/Login
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  <div className="flex justify-center mb-4">
                    <button
                      className={`px-4 py-2 rounded-full ${
                        isLogin ? "bg-blue-500 text-white" : "text-gray-600"
                      }`}
                      onClick={handleToggleLogin}
                    >
                      I have an account
                    </button>
                    <button
                      className={`px-4 py-2 rounded-full ${
                        !isLogin ? "bg-blue-500 text-white" : "text-gray-600"
                      }`}
                      onClick={handleToggleLogin}
                    >
                      I don't have an account
                    </button>
                  </div>

                  {isLogin ? (
                    <form onSubmit={handleLoginSubmit}>
                      <LabelInputContainer>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="projectmayhem@fc.com"
                          type="email"
                          value={loginValues.email}
                          onChange={handleLoginChange}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          placeholder="••••••••"
                          type="password"
                          value={loginValues.password}
                          onChange={handleLoginChange}
                        />
                      </LabelInputContainer>
                      <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium"
                        type="submit"
                      >
                        Login &rarr;
                        <BottomGradient />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                        <LabelInputContainer>
                          <Label htmlFor="firstname">First name</Label>
                          <Input
                            id="firstname"
                            name="firstname"
                            placeholder="Tyler"
                            type="text"
                            value={formValues.firstname}
                            onChange={handleChange}
                          />
                        </LabelInputContainer>
                        <LabelInputContainer>
                          <Label htmlFor="lastname">Last name</Label>
                          <Input
                            id="lastname"
                            name="lastname"
                            placeholder="Durden"
                            type="text"
                            value={formValues.lastname}
                            onChange={handleChange}
                          />
                        </LabelInputContainer>
                      </div>
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          placeholder="projectmayhem@fc.com"
                          type="email"
                          value={formValues.email}
                          onChange={handleChange}
                        />
                      </LabelInputContainer>

                      {/* New Fields */}
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="123-456-7890"
                          type="text"
                          value={formValues.phoneNumber}
                          onChange={handleChange}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="cnicNumber">CNIC Number</Label>
                        <Input
                          id="cnicNumber"
                          name="cnicNumber"
                          placeholder="12345-6789012-3"
                          type="text"
                          value={formValues.cnicNumber}
                          onChange={handleChange}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                          id="bankName"
                          name="bankName"
                          placeholder="XYZ Bank"
                          type="text"
                          value={formValues.bankName}
                          onChange={handleChange}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="bankAccountTitle">
                          Bank Account Title
                        </Label>
                        <Input
                          id="bankAccountTitle"
                          name="bankAccountTitle"
                          placeholder="Tyler Durden"
                          type="text"
                          value={formValues.bankAccountTitle}
                          onChange={handleChange}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="bankAccountNumber">
                          Bank Account Number
                        </Label>
                        <Input
                          id="bankAccountNumber"
                          name="bankAccountNumber"
                          placeholder="000123456789"
                          type="text"
                          value={formValues.bankAccountNumber}
                          onChange={handleChange}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="iban">IBAN</Label>
                        <Input
                          id="iban"
                          name="iban"
                          placeholder="PK00ABCD1234567890123456"
                          type="text"
                          value={formValues.iban}
                          onChange={handleChange}
                        />
                      </LabelInputContainer>
                      <LabelInputContainer className="mb-4">
                        {" "}
                        <Label htmlFor="password">Password</Label>{" "}
                        <Input
                          id="password"
                          name="password"
                          placeholder="••••••••"
                          type="password"
                          value={formValues.password}
                          onChange={handleChange}
                        />{" "}
                      </LabelInputContainer>

                      <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                      >
                        Sign up &rarr;
                        <BottomGradient />
                      </button>

                      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                    </form>
                  )}
                </ModalContent>
              </ModalBody>
            </Modal>
          </>
        )}
      </div>
    </section>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("space-y-1", className)}>{children}</div>;
};

export default HeroSection;
