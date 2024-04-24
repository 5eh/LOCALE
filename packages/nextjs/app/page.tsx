"use client";

import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  MARKETPLACE_SERVICE_PROVIDER,
  MARKETPLACE_SERVICE_PROVIDERS,
  MARKETPLACE_TYPE,
} from "~~/marketplaceVariables/index";

export default function Index() {
  const benefits = [
    "Earn 90% of every listing",
    "Work your own schedule",
    "Immutable portfolio to advance your career",
    "Free spotlight at local events",
    "Access to premium tools to scale your business",
    "Include premium services",
  ];

  const stats = [
    { label: `Unique ${MARKETPLACE_SERVICE_PROVIDERS} active`, value: "256" },
    { label: "Different services available", value: "30+" },
    { label: "Monthly transaction revenue", value: "250k" },
    { label: `Paid out to ${MARKETPLACE_SERVICE_PROVIDERS}`, value: "$7M" },
  ];

  return (
    <>
      <div className="px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-6xl">PREMIUM {MARKETPLACE_TYPE}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Find exceptional {MARKETPLACE_SERVICE_PROVIDERS} near you.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
            {stats.map((stat, statIdx) => (
              <div key={statIdx} className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6">
                <dt className="text-base leading-7 text-gray-300">{stat.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img
          src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2894&q=80"
          alt=""
          className="aspect-[9/4] w-full object-cover xl:rounded-3xl"
        />
      </div>

      {/* CTA section */}
      <div className="relative isolate -z-10 mt-32 sm:mt-40">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
            <img
              className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
              src="https://images.unsplash.com/photo-1519338381761-c7523edc1f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt=""
            />
            <div className="w-full flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                BECOME A {MARKETPLACE_SERVICE_PROVIDER.toUpperCase()}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                This ecosystem of {MARKETPLACE_SERVICE_PROVIDERS} invites you to showcase your portfolio and find new
                prospects.
              </p>
              <ul
                role="list"
                className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
              >
                {benefits.map(benefit => (
                  <li key={benefit} className="flex gap-x-3">
                    <CheckCircleIcon className="h-7 w-5 flex-none" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex">
                <a href="/authentication " className="text-sm font-semibold leading-6 text-indigo-400">
                  REGISTER FOR FREE <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
