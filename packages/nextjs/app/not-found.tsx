import * as React from "react";
import { Metadata } from "next";
import { Navbar } from "~~/components/navbar";
import { COMPANY } from "~~/marketplaceVariables";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <section className="">
      <div className="text-gray-200 layout flex min-h-screen flex-col items-center justify-center text-center text-black">
        <h1 className="mt-8 text-4xl md:text-6xl">PAGE NOT FOUND</h1>
      </div>
    </section>
  );
}
