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
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6">
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
                              ? "text-white"
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

        <div className="sticky top-0 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
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
      </div>
    </>
  );
}
