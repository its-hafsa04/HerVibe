"use client";
import { SignUp } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffe5ec] to-[#ffd6e0] flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <SignUp />
        </div>
      </div>
      <Footer />
    </div>
  );
}