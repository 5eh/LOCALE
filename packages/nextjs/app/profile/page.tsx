"use client";

import { useEffect, useState } from "react";
import { ImGithub, ImInstagram, ImYoutube } from "react-icons/im";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, CheckIcon, EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import Authentication from "~~/app/authentication/page";
import { Button } from "~~/components/buttons/Button";
import Ratings from "~~/components/ratings";
import creator from "~~/routes/listings/creators";
// import listings from "~~/routes/listings/listings";

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

const listings = [
  {
    id: "LISTINGID1",
    date: "2023 - AUG 24",
    price: "540",
    location: "Austin Texas",
    description:
      "This is something absolutely fantastic about something that is glamourous, epic, fanatic, unique and epically epic.",
  },
  {
    id: "LISTINGID2",
    date: "2023 - JUN 12",
    price: "610",
    location: "Austin Texas",
    description: "This is an in-depth description about something super cool...",
  },
  {
    id: "LISTINGID2",
    date: "2023 - FEB 16",
    price: "210",
    location: "Austin Texas",
    description: "This is an in-depth description about something super cool...",
  },
];

const portfolioPictures = [
  {
    src: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1678801868975-32786ae5aeeb?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1528120369764-0423708119ae?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    src: "https://images.unsplash.com/photo-1710454632542-d0a059ee09c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fEZhc2hpb24lMjBwaG90b2dyYXBoeSUyMGRhcmt8ZW58MHx8MHx8fDA%3D",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1697477314014-e58fdd5b5132?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fEZhc2hpb24lMjBwaG90b2dyYXBoeSUyMGRhcmt8ZW58MHx8MHx8fDA%3D",
  },
];

const personalInfo = [
  { feature: "Current job", value: "Software Developer" },
  { feature: "Age", value: "29" },
  { feature: "Favorite Hobby", value: "Painting" },
  { feature: "Years in fashion", value: "5" },
  {
    feature: "Fun fact",
    value: "I can solve a Rubik’s cube in under 2 minutes",
  },
];

export default function Page() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState({});

  // retrieve database information from email

  const currentReview = reviews[currentReviewIndex];

  const goToPreviousReview = () => {
    setCurrentReviewIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : reviews.length - 1));
  };

  const goToNextReview = () => {
    setCurrentReviewIndex(prevIndex => (prevIndex < reviews.length - 1 ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        setEmail(userEmail); // Set email state
        try {
          const response = await fetch(`/api/auth/userDataByEmail?email=${userEmail}`);
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
            console.log("User data:", data);
          } else {
            console.error("Error fetching user data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User email not found, redirecting to login...");
      }
    };

    fetchUserData();
  }, []);

  // Maybe it's this conditional statement.
  // If the user's email is not found, it will return the Authentication component.
  if (!email) {
    return <Authentication />;
  }

  console.log(listings, creator)

  return (
    <>
      <div id="main" className="mx-auto mt-12 pt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <div className=" p-4 rounded-lg">
            <div className=" rounded-lg flex items-center">
              <div className="h-32 w-32 bg-red-600/20 rounded-full"></div>
              <div className="pl-3">
                <p className="text-lg text-gray-200 font-semibold">THOMAS OCOVOS</p>
                <p className="italic text-gray-400">
                  <a href="https://ocovos.com/${OCOVOSSTUDIOS}">@OCOVOSSTUDIOS</a>
                </p>
              </div>
            </div>
            <div className="flex xs:bg-red-400">
              <div className="text-gray-300 mt-1 mb-1 ml-2">
                <p>AUSTIN, TEXAS</p>
              </div>

              <div className="text-gray-600 mt-1 text-xs mb-1 ml-2 italic">
                <p>
                  DATE JOINED:
                  <span className="ml-2 text-sm text-gray-400">JAN 2023</span>
                </p>
              </div>
            </div>

            <div className="text-gray-300">
              <p>
                THIS IS A DESCRIPTION THIS IS A DESCRIPTION THIS IS A DESCRIPTION THIS IS A DESCRIPTION THIS IS A
                DESCRIPTION THIS IS A DESCRIPTION
              </p>
            </div>
          </div>

          <div className="text-yellow-400 p-4 md:col-span-2 lg:col-span-1">
            <div className="break">
              <Ratings rating={4.3} amountOfReviews={2000} />
            </div>

            <div className="gap-4">
              <span className="ml-2 mr-2 inline-flex items-center gap-x-0.5 rounded-md bg-blue-300 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-800/10">
                VERIFIED
              </span>
              <span className="ml-2 mr-2 inline-flex items-center gap-x-0.5 rounded-md bg-yellow-300 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-red-700/10">
                REPUTABLE
              </span>
              <span className="ml-2 mr-2 inline-flex items-center gap-x-0.5 rounded-md bg-green-300 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-700/10">
                WEB3 ENABLED
              </span>
            </div>

            <div className="mt-2 pb-2">
              <div className="mt-2 pb-2">
                <ul role="list">
                  <li key={currentReview.userID} className="col-span-1 divide-y">
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                      <div className="flex-1 truncate">
                        <div className="flex items-center space-x-3">
                          <h3 className="truncate text-md font-medium text-gray-300">{currentReview.name}</h3>
                          <span className="ml-2 mr-2 inline-flex items-center gap-x-0.5 rounded-md bg-blue-300 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-800/10">
                            {currentReview.badge}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-200 line-clamp-3">{currentReview.review}</p>
                      </div>
                      <img className="h-10 w-10 flex-shrink-0 rounded-full" src={currentReview.imageUrl} alt="" />
                    </div>
                    <div>
                      <div className="-mt-px flex">
                        <div className="flex w-0 flex-1">
                          <a
                            onClick={goToPreviousReview}
                            className="cursor-pointer relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                          >
                            <ArrowLeftCircleIcon className="h-5 w-5 text-gray-200" aria-hidden="true" />
                          </a>
                        </div>
                        <div className="-ml-px flex w-0 flex-1">
                          <a
                            onClick={goToNextReview}
                            className="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                          >
                            <ArrowRightCircleIcon className="h-5 w-5 text-gray-200" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Portfolio Media Links - Displayed Flex */}
          <div className="flex flex-wrap gap-3">
            <Button className="inline-flex flex align-center items-center ring-1 ring-gray-500  gap-x-0.5 rounded-md  bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
              <a href="https://socialmedialink.com" className="flex gap-2">
                <ImGithub />
                @OCOVOS
              </a>
            </Button>
            <Button className="inline-flex flex align-center items-center ring-1 ring-gray-500  gap-x-0.5 rounded-md  bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
              <a href="https://socialmedialink.com" className="flex gap-2">
                <ImInstagram />
                @OCOVOSSTUDIOS
              </a>
            </Button>
            <Button className="inline-flex flex align-center items-center ring-1 ring-gray-500  gap-x-0.5 rounded-md  bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
              <a href="https://socialmedialink.com" className="flex gap-2">
                <ImYoutube />
                @OCOVOSYOUTUBE
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
          <div className="col-span-1 md:col-span-3 lg:col-span-3 grid grid-cols-2 gap-4 md:grid-cols-5 lg:grid-cols-6">
            {portfolioPictures.map((image, index) => (
              <div
                key={index}
                className="h-32 bg-red-600/20 overflow-hidden hover:opacity-100 opacity-60 hover:border-gray-800 hover:cursor-pointer"
              >
                <a href={image.src} target="blank">
                  <img src={image.src} alt={`Gallery Image ${index}`} className="w-full h-full object-cover" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 pt-4">
          {/* Listings & Contact Section (MAP THEN ARRAY) */}
          <div className="col-span-1 ">
            {listings.map(listing => (
              <div key={listing.id}>
                <a href={`https://ocovosfashion.com/listings/${listing.id}`}>
                  <div className="bg-gray-800/20 hover:bg-gray-700/20 p-4 shadow rounded-lg mt-2 mb-2">
                    <div className="flex gap-2">
                      <p className="text-gray-300">| {listing.date}</p>
                      <p className="text-gray-400">${listing.price}</p>
                    </div>

                    <p className="text-gray-300 mb-1 mt-1">{listing.location}</p>
                    <p className="font-sm text-white mt-1 mb-1 pl-1 pr-1">{listing.description}</p>
                    <p className="text-blue-400"> Explore Listing </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="gap-4 p-4 col-span-1 w-full">
            <div className="inline-flex flex-col mt-2 mb-2 gap-2 ring-1 ring-gray-500 rounded-md bg-gray-800 border border-gray-700 px-4 py-2 text-xs font-medium text-gray-200 hover:bg-gray-900 hover:text-white">
              <p className="text-sm">CONTACT & NOTIFICATIONS -</p>
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
              <p className="text-sm">THOMAS OCOVOS -</p>
              {personalInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckIcon width={24} height={24} className="text-green-500" />
                  <p className=" flex-1 text-gray-800 text-left">
                    <span className="text-xs text-gray-400">{info.feature}</span> -{" "}
                    <span className="text-sm text-gray-300">{info.value}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
