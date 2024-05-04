// src/app/authentication/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import LoginForm from "~~/app/authentication/login";
import RegisterForm from "~~/app/authentication/register";
import { Navbar } from "~~/components/navbar";
import { MARKETPLACE_NAME, WEB3_FUNCTIONALITY } from "~~/marketplaceVariables";

// src/app/authentication/page.tsx

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
      <div className="pt-24">
        {showLoginForm ? (
          <LoginForm onSwitchForm={toggleForm} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegisterForm onSwitchForm={toggleForm} />
        )}

        {WEB3_FUNCTIONALITY && (
          <div className="mt-2 text-gray-800 dark:text-gray-400 uppercase text-center sm:mx-auto sm:w-full sm:max-w-sm">
            {MARKETPLACE_NAME} is powered and secured by the Ethereum Blockchain. You will be required to log in with
            your Ethereum Wallet, as well as your email in order to interact with the {MARKETPLACE_NAME}
            platform. This is to secure public transactions, account management, and to ensure nonrelated information on
            chain.
            <div>
              <span className="text-primary">
                <a href="/blockchain-policy">READ MORE HERE</a>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Authentication;
