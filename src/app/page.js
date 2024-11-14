"use client";

import Head from "next/head";
import Header from "@/components/header";
import "./globals.css";
import WhyUs from "@/components/WhyUs";
import { useEffect } from "react";
import { isSignedIn } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

import ContactForm from "@/components/ContactForm";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // This is a simple fade-in effect for the page content
    document.querySelectorAll(".fade-in").forEach((element) => {
      element.classList.add("opacity-0");
      setTimeout(() => element.classList.add("opacity-100"), 200);
    });
  }, []);

  const handleClick = () => {
      router.push("/MoodAssessment");
  };

  return (
    <>
      <Head>
        <title>HerVibe</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-r from-[#ffe5ec] to-[#ffd6e0] flex flex-col items-center">
        <Header className="w-[100%]" />
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Flower background decorations */}
          <div className="flower absolute top-10 left-1/4 opacity-70">🌸</div>
          <div className="flower absolute top-1/3 right-1/4 opacity-70">🌷</div>
          <div className="flower absolute bottom-20 left-1/3 opacity-70">
            🌺
          </div>
        </div>

        <div className="max-w-4xl p-[10px] text-center mx-auto mt-[200px]">
          <h1 className="text-4xl font-dancing text-[#5e1a6b] mb-8 fade-in">
            Your Mental Wellness Companion
          </h1>
          <p className="text-lg text-[#5e1a6b] font-light fade-in delay-200">
            Discover a safe space for reflection, growth, and peace.
          </p>
        </div>

        <button
          onClick={handleClick}
          className="max-w-xs mx-auto bg-gradient-to-r from-[#fbc9d1] to-[#f7a8d3] rounded-full shadow-xl p-6 mt-10 hover:scale-105 transition transform duration-300 ease-out"
        >
          <h2 className="font-semibold text-lg text-[#5e1a6b]">Start Now </h2>
        </button>
      </main>
      <WhyUs />
      <div className="bg-gradient-to-b from-[#ffe5ec] to-[#ffd6e0] min-h-screen">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}
