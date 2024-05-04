// src/app/authentication/login.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import login from "~~/routes/data/login";

// src/app/authentication/login.tsx

// src/app/authentication/login.tsx

// src/app/authentication/login.tsx

// src/app/authentication/login.tsx

export default function LoginForm({ onSwitchForm, onLoginSuccess }) {
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  console.log(email);

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitting(true);

    const data = new FormData(event.target);
    const loginData = {
      emailOrUsername: data.get("email"),
      password: data.get("password"),
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await login(loginData);
      if (response.ok) {
        router.push(response.redirectUrl);
        onLoginSuccess(email);
      } else {
        setMessage(response.error);
      }
    } catch (error) {
      setMessage("Login failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            SIGN IN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-800 dark:text-white">
                EMAIL
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="text-left border border-gray-800/40 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-700 dark:text-gray-300 focus:bg-primary/20 dark:focus:bg-gray-700/20 dark:focus:border-primary/60 dark:hover:border-primary/90 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-800 dark:text-white">
                  PASSWORD
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-gray-800 hover:text-black dark:text-primary/80 dark:hover:text-primary"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="text-left border border-gray-800/40 dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-700 dark:text-gray-300 focus:bg-primary/20 dark:focus:bg-gray-700/20 dark:focus:border-primary/60 dark:hover:border-primary/90 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full align-center justify-center text-center border border-gray-800 hover:border-primary dark:border-gray-200/20  bg-gray-700/20  dark:bg-gray-500/20 dark:hover:border-primary/60 py-2 px-3 text-sm font-semibold text-black dark:text-gray-300
              ${submitting ? "bg-gray-700/20" : "focus:bg-gray-700/20 focus:border-primary/40"}
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-primary/50`}
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">Google</span>
            </a>

            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg className="h-5 w-5 fill-[#24292F]" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">GitHub</span>
            </a>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            <a href="#" onClick={onSwitchForm} className="font-semibold leading-6 text-primary hover:text-primary/80">
              REGISTER FOR FREE
            </a>
          </p>
          <div className="text-white text-center center">
            {submitting && <p>Logging in and redirecting...</p>}
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
