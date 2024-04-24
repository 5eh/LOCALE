"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PreviewCard from "../previewCard";
import { Button } from "~~/components/buttons/Button";
import { CURRENCY, LOCAL_TAX_RATE, SALE_PERCENTAGE_CHARGE } from "~~/marketplaceVariables";
import creators from "~~/routes/listings/creators";
import listings from "~~/routes/listings/listings";

type PageProps = {
  params: { id?: Id };
};

export default function Success({ params }: PageProps) {
  // In the future, conditionally render the page *IF* the user is the creator
  const router = useRouter();
  const [listing, setListing] = useState(null);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedListingsData = await listings();
        const fetchedCreatorsData = await creators();
        const id = params?.id as Id;

        console.log(id);

        const matchingListing = fetchedListingsData.find(listing => listing._id === id);

        if (matchingListing) {
          setListing(matchingListing);
          const matchingCreator = fetchedCreatorsData.find(creator => creator._id === matchingListing.creator);
          setCreator(matchingCreator);
          console.log(creator, listing);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [router.isReady, router.query]);

  function earningsRate(price) {
    const totalDeductions = price * (LOCAL_TAX_RATE + SALE_PERCENTAGE_CHARGE);
    const totalEarnings = price - totalDeductions;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: `${CURRENCY}`,
      minimumFractionDigits: 2,
    }).format(totalEarnings);
  }

  return (
    <div id="main" className="mx-auto lg:mt-8 lg:pt-8 max-w-7xl  px-4 sm:px-6 lg:px-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 pt-24 lg:gap-8">
        {/* <div className="col-span-1">
            <PreviewCard creator={creator} listing={listing} />
          </div> */}

        <div className="px-4 sm:px-0 ">
          <div className="mt-6 border-t border-white/10">
            <dl className="divide-y divide-white/10">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">FULL NAME</dt>
                <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {creator?.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">EARNINGS RATE</dt>
                <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {earningsRate(listing?.price)}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">VERIFICATIONS</dt>
                <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                Passport ID
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">CREATED AN ACCOUNT IN</dt>
                <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">2023</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-white/10">
                <dt className="text-sm font-medium leading-6 text-white">ABOUT</dt>
                <dd className="mt-1 text-sm  text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {listing?.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="mt-2 p-2 lg:mt-0 lg:w-full">
        <div className="rounded-2xl lg:pr-10 py-2 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="flex w-full items-center justify-center">
            <div className="h-px flex-1 bg-gray-300 mr-2"></div>

            <div className="flex items-center gap-x-2">
              <Button className="inline-flex items-center ring-1 ring-gray-500 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
                <a href={`/explore/purchase/${listing?._id}`}>VIEW PUBLIC LISTING</a>
              </Button>

              <Button className="inline-flex items-center ring-1 ring-gray-500 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
                <a href={`/message/`}>SHARE LISTING</a>
              </Button>

              <Button className="inline-flex items-center ring-1 ring-gray-500 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
                <a href={`/message/`}>CLOSE SITE</a>
              </Button>
            </div>

            <div className="h-px flex-1 bg-gray-300 ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
