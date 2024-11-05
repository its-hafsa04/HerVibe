"use client";

import Head from "next/head";
import Header from "@/components/header";

export default function Home() {

  return (
    <>
     <Head>
        <title>Mood-booster</title>
      </Head>
    <Header/>
    <main className="min-h-screen bg-gradient-to-b from-[#dac4f2] to-[#8831e8] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 mt-[200px] text-[#422560]">
          Your Mental Wellness Companion
        </h1>
      </div>
    </main>
    </>
  );
}
