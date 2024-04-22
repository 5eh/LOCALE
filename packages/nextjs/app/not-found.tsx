import * as React from "react";
import { Metadata } from "next";
import { Navbar } from "~~/components/navbar";
import { COMPANY } from "~~/marketplaceVariables";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
      <div className="bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">{COMPANY}</span>
            </a>
          </div>

          <Navbar />
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>
      </header>
        <main className="relative isolate">
        <div
          className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>

        <section className="">
          <div className="text-gray-200 layout flex min-h-screen flex-col items-center justify-center text-center text-black">
            <h1 className="mt-8 text-4xl md:text-6xl">PAGE NOT FOUND</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
