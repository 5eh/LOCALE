// src/app/messages/page.tsx

/* eslint-disable @typescript-eslint/no-var-requires */
"use client";

import { useState } from "react";
// import 'stream-chat-react/dist/css/v2/index.css';
// const apiKey = 'fbjndcnsb7gy';
// const userId = 'user-id';
// const token = 'authentication-token';
import { Navbar } from "../../components/navbar";
import { Bars3Icon, CalendarIcon, UsersIcon } from "@heroicons/react/24/outline";

// src/app/messages/page.tsx
/* eslint-disable @typescript-eslint/no-var-requires */

const navigation = [
  { name: "MARKETPLACE", href: "marketplace", icon: UsersIcon, current: false },
  { name: "CHATS", href: "chats", icon: UsersIcon, current: true },
  { name: "REQUESTS", href: "requests", icon: UsersIcon, current: false },
  { name: "ARCHIVE", href: "archive", icon: CalendarIcon, current: false },
];
const teams = [
  {
    id: 1,
    name: "Harry Scott",
    href: "${username}",
    initial: "H",
    current: false,
  },
  {
    id: 2,
    name: "Stevie Wonder",
    href: "${username}",
    initial: "S",
    current: false,
  },
  {
    id: 3,
    name: "Professional Rodgers",
    href: "${username}",
    initial: "P",
    current: false,
  },
  {
    id: 4,
    name: "Jeff Jobs",
    href: "${username}",
    initial: "J",
    current: false,
  },
  {
    id: 5,
    name: "Michael Anderson",
    href: "${username}",
    initial: "M",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="">
        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center"></div>

            <nav className="flex flex-1 flex-col">
              <div className="text-xs font-semibold leading-6 text-gray-400">MESSAGES</div>
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">MESSAGES</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map(team => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">FULL NAME</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">Dashboard</div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
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
          <div className="px-4 sm:px-6 lg:px-8">
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
              {/* Messaging Component here */}
              <p className="text-gray-300">Hello</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
