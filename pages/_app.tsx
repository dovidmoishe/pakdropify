import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";
import UserProvider from "@/lib/context/user";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="PakDropify"
        description="Manage your PakDropify Dashboard wih ease"
      />
      <UserProvider>
        <Component {...pageProps} />;
      </UserProvider>
    </>
  );
}
