// src/app/authentication/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import LoginForm from "~~/app/authentication/login";
import RegisterForm from "~~/app/authentication/register";
import { Navbar } from "~~/components/navbar";
import { MARKETPLACE_NAME, WEB3_FUNCTIONALITY } from "~~/marketplaceVariables";

// src/app/authentication/page.tsx

// src/app/authentication/page.tsx

const Authentication = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if user's email is stored in local storage and update state
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLoginSuccess = userEmail => {
    setEmail(userEmail);
    localStorage.setItem("userEmail", userEmail);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Arthur Labs</span>
              <img />
            </a>
          </div>
          <Navbar />
          <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
        </nav>
      </header>

      <main>
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

        <div className="pt-24">
          {showLoginForm ? (
            <LoginForm onSwitchForm={toggleForm} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <RegisterForm onSwitchForm={toggleForm} />
          )}
          
          {/* Conditionally render if Web3 is enabled */}
          {/* if WEB3_FUNCTIONALITY = true, display this */}
        
          {WEB3_FUNCTIONALITY && (
            <div className="mt-2 text-gray-400 uppercase text-center sm:mx-auto sm:w-full sm:max-w-sm">
              {MARKETPLACE_NAME} is powered and secured by the Ethereum Blockchain. You will be required to log in with
              your Ethereum Wallet, as well as your email in order to interact with the {MARKETPLACE_NAME}
              platform. This is to secure public transactions, account management, and to ensure nonrelated information on
              chain.
              <div>
                <span className="text-blue-400">
                  <a href="/blockchain-policy">READ MORE HERE</a>
                </span>
              </div>  
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Authentication;
