// src/app/purchase/previewCard.tsx

/* ESLINT-DISABLE */
"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/20/solid";
import Modal from "~~/components/Modal";
import { Service_Provider } from "~~/components/Types/publicUserData";
import { Listing_Data } from "~~/components/Types/userListingData";
import { Button } from "~~/components/buttons/Button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~~/components/hoverOverName";
import Ratings from "~~/components/ratings";

// src/app/purchase/previewCard.tsx

/* ESLINT-DISABLE */

interface DataProps {
  creator: Service_Provider | undefined | null;
  listing: Listing_Data;
}

export default function PreviewCard({ creator, listing }: DataProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing_Data | undefined>(undefined);
  const [selectedCreator, setSelectedCreator] = useState<Service_Provider | undefined>(undefined);

  const ClickModal = ({
    open,
    setOpen,
    creator,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
    listing: Listing_Data;
    creator: Service_Provider;
  }) => {
    return (
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="mx-auto max-w-7xl ">
          <div className="mx-auto max-w-2xl  bg-gray-900/95 rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className=" sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-200">
                {selectedListing.title.toUpperCase() ? selectedListing.title.toUpperCase() : "Unknown"}
              </h3>
              <div className="flex gap-2 center">
                <p className="text-base leading-7 text-gray-100">${selectedListing.price}</p>
                <p className="text-base leading-7 text-gray-300">{selectedListing.location.toUpperCase()}</p>
              </div>
              <p className="text-base leading-7 text-gray-400 italic">{selectedListing.serviceType.toUpperCase()}</p>
              <p className="mt-2 text-base leading-7 text-gray-300">{selectedListing.description}</p>

              <div className="mt-10 flex items-center gap-x-2">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                  {creator.name.toUpperCase()}
                </h4>

                <span className="inline-flex items-center gap-x-0.5 rounded-md bg-blue-300 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-800/10">
                  VERIFIED
                </span>
                <span className="inline-flex items-center gap-x-0.5 rounded-md bg-red-300 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-700/10">
                  REPUTABLE
                </span>
                <span className="inline-flex items-center gap-x-0.5 rounded-md bg-green-300 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-700/10">
                  WEB3 ENABLED
                </span>
                <div className="h-px flex-auto bg-gray-300" />
              </div>
              <div className="flex mt-2 mr-2 pl-1 pb-1">
                <a href={`/profile/${creator.username}`}>
                  <span className="relative inline-block">
                    <img className="h-24 w-24 rounded-md" src={creator?.avatar} alt="" />
                  </span>
                </a>
                <div className="block ml-2 text-white">
                  <Ratings rating={creator?.rating ?? 0} amountOfReviews={creator?.amountOfReviews ?? 0} />

                  <p className="text-base leading-7 text-gray-100">{creator?.amountOfReviews} REVIEWS</p>

                  <p className="text-base leading-7 text-gray-400 italic">
                    {creator?.bio ? creator.bio : "No bio available"}
                  </p>
                </div>
              </div>
              <p>
                <a href={creator.media.mediaLinkOne} className="text-base leading-7 text-gray-400 italic">
                  {creator.media.mediaLinkOne}
                </a>
              </p>
              <p>
                <a href={creator.media.mediaLinkTwo} className="text-base leading-7 text-gray-400 italic">
                  {" "}
                  {creator.media.mediaLinkTwo}
                </a>
              </p>
              <p>
                <a href={creator.media.mediaLinkThree} className="text-base leading-7 text-gray-400 italic">
                  {creator.media.mediaLinkThree}
                </a>
              </p>
            </div>

            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl lg:pr-10 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto">
                  <img src={selectedListing.photo} alt="" className="w-full" />
                </div>

                <div className="mt-10 flex items-center gap-x-2">
                  <div className="h-px flex-auto bg-gray-300" />

                  <Button className="inline-flex items-center ring-1 ring-gray-500  gap-x-0.5 rounded-md  bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
                    <a href={`/purchase/${selectedListing.listingID}`}>PROCEED TO CHECKOUT</a>
                  </Button>

                  <Button className="inline-flex items-center ring-1 ring-gray-500  gap-x-0.5 rounded-md  bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
                    <a href={`/message/${creator.username}`}>MESSAGE {creator.name.toUpperCase()}</a>
                  </Button>

                  <div className="h-px flex-auto bg-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-3 lg:max-w-7xl lg:px-4">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-8">
        {listing.map(data => (
          <div key={data.listingID} className="group relative">
            <div
              className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80"
              onClick={() => {
                setModalOpen(true);
                setSelectedListing(data);
              }}
            >
              <img
                src={data.photo}
                alt={`Photo of ${data.title}`}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex max-w-max justify-between">
              <HoverName creator={creator} listing={data} />
            </div>
          </div>
        ))}
        {modalOpen && selectedListing && (
          <ClickModal open={modalOpen} setOpen={setModalOpen} listing={selectedListing} creator={creator} />
        )}
      </div>
    </div>
  );
}

export function HoverName(props: DataProps) {
  const { creator, listing } = props;

  // Create API to call MongoDB listings

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-sm text-gray-400">
          {listing.title ? listing.title : "Unknown"}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 text-white z-5 bg-gray-900">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <div className="text-sm flex gap-2">
              <p className="bold">{creator ? creator.name : "Unknown"}</p>
              <div className="text-gray-400 italic cursor-pointer">
                <Link href={`/profile/${creator ? creator.username : ""}`}>
                  {creator ? "@" + creator.username : "Unknown"}
                </Link>
              </div>
            </div>
            <div className="text-sm flex">
              {creator && creator.rating !== undefined ? (
                <Ratings rating={creator?.rating ?? 0} amountOfReviews={creator?.amountOfReviews ?? 0} />
              ) : (
                "No Ratings"
              )}{" "}
              <span className="italic text-gray-400 ml-1">({creator?.amountOfReviews})</span>
            </div>
            {/* Additional content can go here */}
            <div className="flex items-center pt-2">
              <span className="text-sm text-muted-foreground">{listing.description}</span>
            </div>

            <div className="flex items-center hover:bg-gray-800 transition-opacity duration-400 rounded-md">
              <CheckIcon width={24} height={24} className="m-3" />
              <p className="text-sm flex-1 text-left">
                {listing.features[0].feature}: {listing.features[0].value}
              </p>
            </div>
            <div className="flex items-center hover:bg-gray-800 transition-opacity duration-400 rounded-md">
              <CheckIcon width={24} height={24} className="m-3" />
              <p className="text-sm flex-1 text-left">
                {listing.features[1].feature}: {listing.features[1].value}
              </p>
            </div>

            <div className="text-xs text-gray-600">
              {listing.quantityOfService === 1 ? (
                <p className="text-red-400">ONE TIME SERVICE</p>
              ) : listing.quantityOfService > 1 && listing.quantityOfService <= 5 ? (
                <p className="text-red-200">FEW SPOTS LEFT </p>
              ) : (
                <p>{listing.quantityOfService} REMAINING SPOTS FOR BOOKING</p>
              )}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
