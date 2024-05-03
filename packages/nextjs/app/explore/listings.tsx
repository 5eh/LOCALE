// src/app/explore/listings.tsx

/* ESLINT-DISABLE */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/hoverOverName";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Modal from "~~/components/Modal";
import { Service_Provider } from "~~/components/Types/publicUserData";
import { Listing_Data } from "~~/components/Types/userListingData";
import { Button } from "~~/components/buttons/Button";
import Ratings from "~~/components/ratings";


interface DataProps {
  creator: Service_Provider | undefined | null;
  listing: Listing_Data[];
}

export default function Listings({ creator, listing }: DataProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing_Data | undefined>(undefined);
  const [selectedCreator, setSelectedCreator] = useState<Service_Provider | undefined>(undefined);

  const router = useRouter();

  const handleCheckout = () => {
    if (selectedListing && selectedListing._id) {
      const href = `explore/purchase/${selectedListing._id}`; // Using template literals to construct the path
      router.push(href);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-2 sm:px-3 lg:max-w-7xl lg:px-4">
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {listing.map(data => {
          const matchedCreator = Array.isArray(creator) ? creator.find(c => c._id === data.creator) : undefined;

          const ClickModal = ({
            open,
            setOpen,
            listing,
            creator,
          }: {
            open: boolean;
            setOpen: (open: boolean) => void;
            listing: Listing_Data;
            creator: Service_Provider;
          }) => {
            return (
              <Modal open={open} onClose={() => setOpen(false)}>
                <div className="mx-auto z-20 max-w-7xl">
                  <div className="mx-auto max-w-2xl bg-gray-900/95 dark:bg-gray-900/95 ring-1 ring-primary sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className=" sm:p-10 lg:flex-auto">
                      <h3 className="text-2xl font-bold text-gray-200">
                        {selectedListing?.title ? selectedListing.title.toUpperCase() : "Unknown"}
                      </h3>
                      <div className="flex gap-2 center">
                        <p className="text-base text-gray-100">${selectedListing?.price}</p>
                        <p className="text-base text-gray-400">{selectedListing?.location.toUpperCase()}</p>
                      </div>
                      <p className="text-base text-gray-400 italic">
                        {selectedListing?.serviceType ? selectedListing.serviceType.toUpperCase() : "UNDEFINED"}
                      </p>

                      <p className="text-base leading-7 text-gray-300">{selectedListing?.description}</p>

                      <div className="mt-10 flex items-center gap-x-2">
                        <p className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                          <a href={`/${creator.username}`}>{creator.name.toUpperCase()}</a>
                        </p>

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
                        <a href={`/${creator.username}`}>
                          <span className="relative inline-block">
                            <img className="h-24 w-24 rounded-md" src={creator?.profilePicture} alt="" />
                          </span>
                        </a>
                        <div className="block ml-2 text-white">
                          <Ratings rating={creator?.rating ?? 0} amountOfReviews={creator?.amountOfReviews ?? 0} />

                          <p className="text-base leading-7 text-gray-100">{creator?.amountOfReviews} REVIEWS</p>

                          <p className="text-base leading-7 text-gray-400 italic">
                            {creator?.about.bio ? creator.about.bio : "No bio available"}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center pl-1 pr-1 ml-1 mr-1 bg-gray-200/10 px-2 py-1 text-xs font-medium text-pink-300 ring-1 ring-inset ring-pink-400/20">
                        <a href={creator.media.mediaLinkOne}>INSTAGRAM</a>
                      </span>
                      <span className="inline-flex items-center pl-1 pr-1 ml-1 mr-1 bg-white/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
                        <a href={creator.media.mediaLinkTwo}> LINKEDIN</a>
                      </span>

                      <span className="inline-flex items-center pl-1 pr-1 ml-1 mr-1 bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/30">
                        <a href={creator.media.mediaLinkThree}>YOUTUBE</a>
                      </span>
                    </div>

                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                      <div className="rounded-2xl lg:pr-10 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                        <div className="mx-auto">
                          <img src={selectedListing?.photo} alt="" className="w-full" />
                        </div>

                        <div className="mt-10 flex items-center gap-x-2">
                          <div className="h-px flex-auto bg-gray-300" />

                          <Button
                            onClick={handleCheckout}
                            className="inline-flex items-center ring-1 ring-gray-500 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white"
                          >
                            PROCEED TO CHECKOUT
                          </Button>

                          <Link href={`/message/${creator.username}`}>
                            <Button className="inline-flex items-center ring-1 ring-gray-500  gap-x-0.5 rounded-md  bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
                              MESSAGE {creator.name.toUpperCase()}
                            </Button>
                          </Link>

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
            <div key={data.listingID} className="group relative">
              <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80"
                onClick={() => {
                  setModalOpen(true);
                  setSelectedListing(data);
                  setSelectedCreator(matchedCreator);
                }}
              >
                <img
                  src={data.photo}
                  alt={`Photo of ${data.photo}`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 z-10 flex max-w-max justify-between">
                <HoverName creator={matchedCreator} listing={data} />
              </div>
              {modalOpen && selectedListing && selectedCreator && (
                <ClickModal
                  open={modalOpen}
                  setOpen={setModalOpen}
                  listing={selectedListing}
                  creator={selectedCreator}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HoverName(props: DataProps) {
  const { creator, listing } = props;

  const renderFeatures = () => {
    if (Array.isArray(listing.features) && listing.features.length > 0) {
      return listing.features.map((feature, index) => (
        <div
          key={index}
          className="flex z-10 items-center hover:bg-gray-800 transition-opacity duration-400 rounded-md"
        >
          <CheckCircleIcon width={24} height={24} className="m-3" />
          <p className="text-sm flex-1 text-left">
            {feature.feature}: {feature.value}
          </p>
        </div>
      ));
    } else {
      return <p className="text-sm">No Features Listed</p>;
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-sm text-gray-400">
          {listing.title ? listing.title : "Unknown"}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 text-white z-10 bg-gray-900">
        <div className="flex justify-between space-x-4">
          <div className="">
            <div className="text-sm">
              <p className="bold">{creator ? creator.name : "Unknown"}</p>
              <p className="text-gray-400 italic cursor-pointer">
                <Link href={`/${creator ? creator.username : ""}`}>{creator ? "@" + creator.username : "Unknown"}</Link>
              </p>
            </div>
            <div className="text-sm flex">
              {creator && creator.rating !== undefined ? (
                <Ratings rating={creator?.rating ?? 0} amountOfReviews={creator?.amountOfReviews ?? 0} />
              ) : (
                "No Ratings"
              )}{" "}
              <span className="italic text-gray-400 ml-1">({creator?.amountOfReviews})</span>
            </div>
            <div className="flex items-center pt-2">
              <span className="text-sm text-muted-foreground">{listing.description}</span>
            </div>

            {renderFeatures()}

            <div className="text-xs text-gray-600">
              {listing.quantityOfService === 1 ? (
                <p className="text-red-400">ONE REMAINING</p>
              ) : listing.quantityOfService > 1 && listing.quantityOfService <= 5 ? (
                <p className="text-red-200">FEW PRODUCTS LEFT </p>
              ) : (
                <p className='text-green-400'>{listing.quantityOfService} REMAINING PRODUCTS</p>
              )}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
