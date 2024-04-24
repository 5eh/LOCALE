// src/app/explore/page.tsx

/* ESLINT-DISABLE */
"use client";

import React, { useEffect, useState } from "react";
import Sorting from "~~/app/explore/sorting";

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
    <div>
      <Sorting listing={listingsData} creator={creatorsData} />
    </div>
  );
};

export default Page;
