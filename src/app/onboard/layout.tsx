import React from "react";
import AuthHeader from "../_components/headers/auth";

const OnBoardingLayuout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full">
      <section className="relative flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#c8ede9] to-[#f7fdfc] to-[35%] px-6 py-12 pt-30 pb-12">
        <AuthHeader />
        {children}
      </section>
    </main>
  );
};

export default OnBoardingLayuout;
