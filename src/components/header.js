"use client";
import {
  UserButton,
  SignedOut,
  SignInButton,
  SignedIn,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="flex w-full justify-between items-center p-5 bg-gradient-to-r from-pink-200 to-pink-100 shadow-md rounded-b-3xl">
      <h1 className="text-3xl font-bold text-[#5e1a6b] font-dancing">
        HerVibe
      </h1>
      <div className="flex items-center gap-5">
        {isSignedIn ? (
          <>
            <Link
              href="/"
              className="text-lg text-[#a954ba] hover:text-[#53134b] font-medium transition duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link
              href="/MoodAssessment"
              className="text-lg text-[#a954ba] hover:text-[#53134b] font-medium transition duration-300 ease-in-out"
            >
              Dashboard
            </Link>
            <UserButton />
          </>
        ) : (
          <>
            <SignedOut>
              <SignInButton>
                <button className="bg-[#f7a8d3] text-[#5e1a6b] font-semibold px-4 py-2 rounded-full shadow-md hover:bg-[#f0c7e4] transition duration-300 ease-in-out">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </>
        )}
      </div>
    </header>
  );
}