"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImInstagram, ImYoutube } from "react-icons/im";
import { getAddress } from "viem";
import { useAccount } from "wagmi";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, CheckIcon, EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import Authentication from "~~/app/authentication/page";
import { Button } from "~~/components/buttons/Button";
import Ratings from "~~/components/ratings";
import { WEB3_FUNCTIONALITY } from "~~/marketplaceVariables";
import creators from "~~/routes/listings/creators";
import listings from "~~/routes/listings/listings";

const reviews = [
  {
    name: "Jane Cooper",
    review:
      "OCOVOS provides an exceptional service and I wish I was able to give them more than 5 stars. I would highly recommend them to anyone.",
    badge: "VERIFIED",
    userID: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Steve Jobs",
    review: "Suspiciously excellent service",
    badge: "2FA",
    userID: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Steve Jeebs",
    review: "Suspiciously excellent service",
    badge: "2FA",
    userID: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

const portfolioPictures = [
  {
    src: "https://plus.unsplash.com/premium_photo-1681290358247-c160fc097bdb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1545147986-a9d6f2ab03b5?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const { address, isConnected } = useAccount();
  const [listingsData, setListingsData] = useState([]);
  const [walletListings, setWalletListings] = useState([]); // New state for listings by wallet

  useEffect(() => {
    if (isConnected && address) {
      console.log("Connected Address:", getAddress(address)); // Log the checksummed address
    } else {
      console.log("No wallet connected");
    }
  }, [address, isConnected]);

  useEffect(() => {
    console.log("Checking connection and address:", { isConnected, address });
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const fetchedListingData = await listings();
        const fetchedCreatorsData = await creators();
        const userEmail = localStorage.getItem("userEmail");

        if (userEmail) {
          setEmail(userEmail);
          const matchingUser = fetchedCreatorsData.find(u => u.email === userEmail);
          setUser(matchingUser);

          if (matchingUser) {
            const matchingListings = fetchedListingData.filter(listing => listing.creator === matchingUser._id);
            setListingsData(matchingListings);
          }

          if (address) {
            const listingsByWallet = fetchedListingData.filter(listing => listing.userWallet === address);
            setWalletListings(listingsByWallet); // Update state for wallet listings
            console.log("Listings by Wallet Address:", listingsByWallet);
          }
        } else {
          setEmail(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [address, isConnected]);

  const currentReview = reviews[currentReviewIndex];

  const goToPreviousReview = () => {
    setCurrentReviewIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : reviews.length - 1));
  };

  const goToNextReview = () => {
    setCurrentReviewIndex(prevIndex => (prevIndex < reviews.length - 1 ? prevIndex + 1 : 0));
  };

  const [shipStatus, setShipStatus] = useState("SHIP NOW"); // Initial button state
  const handleShip = async () => {
    setShipStatus("LOADING");
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShipStatus("CONFIRMED");
    } catch (error) {
      console.error("Shipping failed:", error);
      setShipStatus("SHIP NOW");
    }
  };

  if (!email) {
    return <Authentication />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div id="main" className="mx-auto mt-12 pt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        {WEB3_FUNCTIONALITY && walletListings.length > 0 && (
          <div className="rounded w-full grid grid-cols-1 md:grid-cols-4 gap-4 pb-6">
            <div className="flex flex-col gap-3">
              <Button className="text-left border border-white w-full bg-gray-500/20 py-4 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none">
                UNFULFILLED
              </Button>
              <Button className="text-left border border-white w-full bg-gray-500/20 py-4 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none">
                PURCHASED
              </Button>
              <Button className="text-left border border-white w-full bg-gray-500/20 py-4 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none">
                ANALYTICS
              </Button>
            </div>

            {/* Dynamically create a grid column for each listing */}
            {walletListings.map((listing, index) => (
              <div
                key={`wallet-${index}`}
                className="border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm"
              >
                <p className="dark:text-white text-gray-800">{listing.title}</p>
                <p className="dark:text-gray-200 text-gray-800">{listing.price}</p>
                <p className="text-primary">LISTING ADDRESS</p>
                <div className="flex ml-1 mr-1 gap-1">
                  <Button
                    className="border border-gray-200/20 w-full bg-primary/20 dark:bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/30 hover:border-primary focus:outline-none"
                    onClick={handleShip}
                  >
                    {shipStatus}
                  </Button>
                  <Button className="border border-gray-200/20  w-full bg-primary/20 dark:bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/30 hover:border-primary focus:outline-none">
                    <a href={`/explore/${listing._id}`}>VIEW LISTING</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className=" p-4 rounded-full">
            <div className=" rounded-lg flex items-center">
              <div className="h-32 w-32 bg-red-600/20 rounded-full">
                <img src={user.profilePicture} alt="Profile Picture" className="h-32 w-32 rounded-full" />
              </div>
              <div className="pl-3">
                <p className="text-lg text-gray-800 dark:text-gray-200 font-semibold">{user.name}</p>
                <p className="italic text-gray-700 dark:text-gray-400">
                  <a href="https://ocovos.com/${OCOVOSSTUDIOS}">@{user.username}</a>
                </p>
                <Ratings rating={user.rating} amountOfReviews={user.amountOfReviews} />
                <div className="gap-4">
                  {user.badges.map((badge, index) => (
                    <span
                      key={`badge-${index}`}
                      className="ml-2 mr-2 align-center inline-flex items-center gap-x-0.5 rounded-md bg-blue-300 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-800/10"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="block">
              <div className="text-gray-800 dark:text-gray-300">
                <p>{user.location}</p>
              </div>

              <div className="text-gray-800 dark:text-gray-300 mt-1 text-xs italic">
                <p>
                  ACCOUNT AGE:
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-100">{user.years} years</span>
                </p>
              </div>
            </div>

            <div className="text-gray-800 dark:text-gray-300">
              <p>{user.about.bio}</p>
            </div>
          </div>

          <div className="mt-2">
            <div className="mt-2 border border-black dark:border-white">
              <ul role="list">
                <li key={currentReview.userID} className="">
                  <div className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-md font-medium text-gray-800 dark:text-gray-300">
                          {currentReview.name}
                        </h3>
                        <span className="ml-2 mr-2 inline-flex items-center gap-x-0.5 rounded-md bg-blue-300 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-800/10">
                          {currentReview.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-200 line-clamp-3">
                        {currentReview.review}
                      </p>
                    </div>
                    <img
                      className="h-10 w-10 flex-shrink-0 rounded-full bg-primary/20"
                      src={currentReview.imageUrl}
                      alt={`${currentReview.name} Profile Picture`}
                    />
                  </div>
                  <div>
                    <div className="-mt-px flex">
                      <div className="flex w-0 flex-1 hover:bg-primary/20 ">
                        <a
                          onClick={goToPreviousReview}
                          className="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          <ArrowLeftCircleIcon
                            className="h-5 w-5 text-gray-600 dark:text-gray-200"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                      <div className="-ml-px flex w-0 flex-1 hover:bg-primary/20">
                        <a
                          onClick={goToNextReview}
                          className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          <ArrowRightCircleIcon
                            className="h-5 w-5 text-gray-600 dark:text-gray-200"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Portfolio Media Links - Displayed Flex */}
          <div className="flex gap-3">
            <Button className="flex items-center justify-center ring-1 ring-gray-500 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
              <a href={user.media[0]} className="flex items-center gap-2">
                <ImYoutube />@{user.name}
              </a>
            </Button>
            <Button className="flex items-center justify-center ring-1 ring-gray-500 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
              <a href={user.media[1]} className="flex items-center gap-2">
                <ImInstagram />@{user.name}
              </a>
            </Button>
            <Button className="flex items-center justify-center ring-1 ring-gray-500 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
              <a href={user.media[2]} className="flex items-center gap-2">
                <ImYoutube />@{user.name}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
          <div className="col-span-1 md:col-span-3 lg:col-span-3 grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-6">
            {portfolioPictures.map((image, index) => (
              <div
                key={index}
                className="h-32 bg-primary/20 overflow-hidden hover:opacity-100 opacity-60 hover:border-gray-800 hover:cursor-pointer"
              >
                <a href={image.src} target="blank">
                  <img src={image.src} alt={`Gallery Image ${index}`} className="w-full h-full object-cover" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 pt-4">
          <div className="col-span-1 ">
            {listingsData.map(listing => (
              <div key={listing.id}>
                <a href={`/explore/purchase/${listing.id}`}>
                  <div className="bg-gray-200/20 dark:bg-gray-800/20 border border-gray-500 dark:border-transparent hover:bg-gray-700/20 p-4 shadow rounded-lg mt-2 mb-2">
                    <div className="flex gap-2">
                      <p className="text-gray-800 dark:text-gray-300">| {listing.date}</p>
                      <p className="text-gray-700 dark:text-gray-400">${listing.price}</p>
                    </div>

                    <p className="text-gray-800 dark:text-gray-300 mb-1 mt-1">{listing.location}</p>
                    <p className="font-sm text-white mt-1 mb-1 pl-1 pr-1">{listing.description}</p>
                    <p className="text-primary/60 hover:text-primary dark:text-primary/60 dark:hover:text-primary">
                      Explore Listing{" "}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="gap-4 p-4 col-span-1 w-full">
            <div className="inline-flex flex-col mt-2 mb-2 gap-2 ring-1 ring-gray-500 rounded-md bg-gray-800 border border-gray-700 px-4 py-2 text-xs font-medium text-gray-200 hover:bg-gray-900 hover:text-white">
              <p className="text-sm">CONTACT & NOTIFICATIONS</p>
              <p>Subscribe to their account to get access to their latest listings and updates.</p>
              <div className="flex justify-between items-center mt-2">
                <div className="relative flex-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute bg-transparent inset-y-0 left-0 flex items-center pl-3">
                    <EnvelopeOpenIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full bg-transparent rounded-md border-0 py-1.5 pl-10 text-gray-400 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-transparent hover:bg-gray-800/20 ring-inset ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="inline-flex flex-col mt-2 mb-2 gap-2 ring-1 ring-gray-500 rounded-md bg-gray-800 border border-gray-700 px-4 py-2 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
              <p className="text-sm">{user.name}</p>

              <div className="flex items-center gap-2">
                <CheckIcon width={24} height={24} className="text-green-500" />
                <div className="flex-1 text-gray-800 text-left">
                  <span className="text-xs text-gray-400">Born:</span>
                  <span className="text-sm text-gray-300"> {user.about.born}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon width={24} height={24} className="text-green-500" />
                <div className="flex-1 text-gray-800 text-left">
                  <span className="text-xs text-gray-400">Fun Fact:</span>
                  <span className="text-sm text-gray-300"> {user.about.funFact}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon width={24} height={24} className="text-green-500" />
                <div className="flex-1 text-gray-800 text-left">
                  <span className="text-xs text-gray-400">Raised In:</span>
                  <span className="text-sm text-gray-300"> {user.about.raisedIn}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon width={24} height={24} className="text-green-500" />
                <div className="flex-1 text-gray-800 text-left">
                  <span className="text-xs text-gray-400">Works At:</span>
                  <span className="text-sm text-gray-300"> {user.about.worksAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon width={24} height={24} className="text-green-500" />
                <div className="flex-1 text-gray-800 text-left">
                  <span className="text-xs text-gray-400">Years:</span>
                  <span className="text-sm text-gray-300"> {user.about.years}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
