"use client";
import { UserButton, SignedOut, SignInButton, SignedIn, useUser } from "@clerk/nextjs";


export default function Header() {

    const { isSignedIn } = useUser();

  return (
    <header className="flex justify-between items-center p-5 bg-[#2a1145]">
      <h1 className="text-3xl font-bold text-gray-100">
        Mood-booster
      </h1>
      <div className="mr-5">
      {isSignedIn ? (
      <>
      <a href="/"  className="mr-5">Home</a>
      <a href="/MoodAssessment" className="mr-5">Dasboard</a>
          <UserButton />
      </>
      ) : (
        <>
        <SignedOut>
          <SignInButton />
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