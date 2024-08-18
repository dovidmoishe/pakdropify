import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Head } from "next/document";
import { NextSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
      title="PakDropify"
      description="Manage your PakDropify Dashboard wih ease"
      
    />
      <Component {...pageProps} />;
    </>
  );
}
