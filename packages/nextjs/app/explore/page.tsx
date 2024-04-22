// src/app/explore/page.tsx

/* ESLINT-DISABLE */
"use client";

import React, { useEffect, useState } from "react";
import Sorting from "~~/app/explore/sorting";
import Footer from "~~/components/footer";
import { Navbar } from "~~/components/navbar";
import creators from "~~/routes/listings/creators";
import listings from "~~/routes/listings/listings";

const Page = () => {
  const [listingsData, setListingsData] = useState([]);
  const [creatorsData, setCreatorsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedListingsData = await listings();
        const fetchedCreatorsData = await creators();
        setListingsData(fetchedListingsData);
        setCreatorsData(fetchedCreatorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global">
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

      <main className="relative isolate">
        {/* Background */}
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
        <Sorting listing={listingsData} creator={creatorsData} />
      </main>
      <Footer />
    </div>
  );
};

export default Page;

// COMBINED DATA FUNCTION
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const listingsData = await fetchListings();
//       const creatorsData = await fetchCreators();

//       const combined = creatorsData.map((creator) => {
//         const userListingData = listingsData.filter((listing) => listing.creator === creator._id);
//         return {
//           user: creator,
//           listings: userListingData,
//         };
//       });

//       setCombinedData(combined);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   fetchData();
// }, []);