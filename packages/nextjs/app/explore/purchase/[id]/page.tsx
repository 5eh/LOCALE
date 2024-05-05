"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PreviewCard from "./previewCard";
import { Button } from "~~/components/buttons/Button";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import {
  COMPANY,
  MARKETPLACE_TEMPLATE_TYPE,
  WEB3_FUNCTIONALITY,
} from "~~/marketplaceVariables";
import creators from "~~/routes/listings/creators";
import listings from "~~/routes/listings/listings";

type PageProps = {
  params: { id?: Id };
};

export default function Purchase({ params }: PageProps) {
  const router = useRouter();

  const [deliveryInfo, setDeliveryInfo] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [customInstructions, setCustomInstructions] = useState("");
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("CommerceContract");

  const [time, setTime] = useState("");
  const [listing, setListing] = useState(null);
  const [creator, setCreator] = useState(null);
  const id = params?.id as Id;
  const listingID = id;

  // WEB2
  const handleInputChange = event => {
    const { name, value } = event.target;
    if (name === "instructions") {
      setCustomInstructions(value);
    } else {
      setDeliveryInfo(prevInfo => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedListingsData = await listings();
        const fetchedCreatorsData = await creators();

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

  // WEB3
  // READ LISTING DATA
  const { data: fetchedProductData } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getProductData",
    args: [listingID],
  });

  useEffect(() => {
    if (fetchedProductData) {
      console.log("Fetched Product Data:", fetchedProductData);
    } else {
      console.log("not found");
    }
  }, [fetchedProductData]);

  // READ ADDRESS DATA
  const { data: fetchedDeliveryAddress } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getDeliveryAddress",
    args: [listingID],
  });

  useEffect(() => {
    if (fetchedDeliveryAddress) {
      console.log("Fetched Delivery Address:", fetchedDeliveryAddress);
    } else {
      console.log("Not found or not configured");
    }
  }, [fetchedDeliveryAddress]);

  // READ INSTRUCTION DATA
  const { data: fetchedCustomInstructions } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "getCustomInstructions",
    args: [listingID],
  });

  useEffect(() => {
    if (fetchedCustomInstructions) {
      console.log("Fetched Custom Instructions:", fetchedCustomInstructions);
    } else {
      console.log("Not found or not configured");
    }
  }, [fetchedCustomInstructions]);

  // WRITE ADDRESS DATA
  const { data: setDeliveryAddress } = useScaffoldWriteContract({
    contractName: "CommerceContract",
    functionName: "setDeliveryAddress",
    args: [`${deliveryInfo.street}, ${deliveryInfo.city}, ${deliveryInfo.state}, ${deliveryInfo.zip}`],
  });

  useEffect(() => {
    if (setDeliveryAddress) {
      console.log("Write Delivery Address:", setDeliveryAddress);
    } else {
      console.log("Incorrectly configured");
    }
  }, [setDeliveryAddress]);

  // READ INSTRUCTION DATA
  const { data: writeCustomInstructions } = useScaffoldReadContract({
    contractName: "CommerceContract",
    functionName: "setCustomInstructions",
    args: [listingID],
  });

  useEffect(() => {
    if (writeCustomInstructions) {
      console.log("Write Custom Instructions:", writeCustomInstructions);
    } else {
      console.log("Incorrectly configured");
    }
  }, [writeCustomInstructions]);

  // PURCHASE CONTRACT

  const handleBlockchainPurchase = async () => {
    try {
      // First, ensure that the delivery address is set before making the purchase
      if (!deliveryInfo.street || !deliveryInfo.city || !deliveryInfo.state || !deliveryInfo.zip) {
        console.error("Please complete all delivery information fields.");
        return;
      }

      const fullDeliveryAddress = `${deliveryInfo.street}, ${deliveryInfo.city}, ${deliveryInfo.state}, ${deliveryInfo.zip}`;

      // Set the delivery address on the blockchain
      await writeYourContractAsync({
        functionName: "setDeliveryAddress",
        args: [fullDeliveryAddress],
      });

      // Set custom instructions if provided
      if (customInstructions) {
        await writeYourContractAsync({
          functionName: "setCustomInstructions",
          args: [customInstructions],
        });
      }

      // Proceed with the purchase
      await writeYourContractAsync({
        functionName: "purchaseProduct",
        args: [listingID, 1], // The quantity is statically set to 1 as per your requirement
        value: listing.price, // This should be the price of the listing converted to Wei if necessary
      });

      console.log("Purchase successful!");
    } catch (error) {
      console.error("Failed to complete the purchase:", error);
    }
  };

  if (!listing || !creator) {
    return (
      <div className="justify-center text-center mt-24">
        <h1>Listing or Creator Not Found</h1>
        <p>This could also be loading. Test the code</p>
        <button onClick={() => router.push("/explore")}>Go to Explore</button>
      </div>
    );
  }

  return (
    <div id="main" className="mx-auto lg:mt-8 lg:pt-8 max-w-7xl px-4 sm:px-6 lg:px-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8  mt-24">
        {/* <div className="col-span-1">
            <PreviewCard creator={creator} listing={listing} />
          </div> */}

        <div className="px-4 sm:px-0">
          <div className="mt-6 border-t border-white/10">
            <dl className="divide-y divide-white/10">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">FULL NAME</dt>
                <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {creator.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">TOTAL PRICE</dt>
                <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {/* {earningsRate(listing.price)} */}
                  {/* {totalPrice(listing.price)} */}{listing.price}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">VERIFICATIONS</dt>
                <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">EMAIL</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">CREATED AN ACCOUNT IN</dt>
                <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">2023</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-white/10">
                <dt className="text-sm font-medium leading-6 text-white">ABOUT</dt>
                <dd className="mt-1 text-sm  text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {listing.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* DISABLE FOLLOWING FUNCTION UNLESS SERVICE MARKETPLACE */}
        {/* {MARKETPLACE_TEMPLATE_TYPE === "service" && (
          <div className="col-span-1">
            <div className="border-2 border-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-100">SCHEDULE INFORMATION</h3>
                <form className="mt-5">
                  <div className="w-full mt-3">
                    <label htmlFor="time" className="sr-only">
                      TIME
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      value={time}
                      onChange={setTime}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="Select Time"
                    />
                  </div>
                  <div className="w-full mt-3">
                    <label htmlFor="date" className="sr-only">
                      DATE
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="Select Date"
                    />
                  </div>
                  <div className="w-full mt-3">
                    <label htmlFor="description" className="sr-only">
                      DESCRIPTION
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      rows={3}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="Please expect a party of 3 people. We will be bringing our dog. It's our sisters birthday, so we would like to take some photos with her."
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )} */}
        {MARKETPLACE_TEMPLATE_TYPE === "commerce" && (
          <div className="col-span-1">
            <div className="border-2 border-gray-400/20 shadow sm:rounded-lg">
              <div className="px-4 pt-2 sm:p-6">
                <h3 className="text-lg font-semibold leading-6 text-gray-100">DELIVERY INFORMATION</h3>
                <form className="mt-5">
                  <div className="w-full mt-3 flex gap-2">
                    <label htmlFor="street" className="sr-only">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      value={deliveryInfo.street}
                      onChange={handleInputChange}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                      placeholder="1234 Main St"
                    />
                    <label htmlFor="city" className="sr-only">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={deliveryInfo.city}
                      onChange={handleInputChange}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                      placeholder="Anytown"
                    />
                  </div>
                  <div className="w-full mt-3 flex gap-2">
                    <label htmlFor="state" className="sr-only">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={deliveryInfo.state}
                      onChange={handleInputChange}
                      id="state"
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                      placeholder="State"
                    />
                    <label htmlFor="zip" className="sr-only">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      value={deliveryInfo.zip}
                      onChange={handleInputChange}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                      placeholder="Zip Code"
                    />
                  </div>
                  <div className="w-full mt-3">
                    <label htmlFor="zip" className="sr-only">
                      CUSTOM INSTRUCTIONS?
                    </label>
                    <textarea
                      name="instructions"
                      id="instructions"
                      value={customInstructions}
                      onChange={handleInputChange}
                      rows={3}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                      placeholder="CUSTOM INSTRUCTIONS"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* {MARKETPLACE_TEMPLATE_TYPE === "delivery" && (
          <div className="col-span-1">
            <div className="border-2 border-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-100">PICKUP LOCATION</h3>
                <form className="mt-5">
                  <div className="w-full mt-3">
                    <label htmlFor="time" className="sr-only">
                      TIME
                    </label>
                    <input
                      type="time"
                      name="time"
                      id="time"
                      value={time}
                      onChange={handleTimeChange}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="Select Time"
                    />
                  </div>
                  <div className="w-full mt-3">
                    <label htmlFor="date" className="sr-only">
                      DATE
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="Select Date"
                    />
                  </div>
                  <div className="w-full mt-3 flex gap-2">
                    <label htmlFor="street" className="sr-only">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="1234 Main St"
                    />
                    <label htmlFor="city" className="sr-only">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="Anytown"
                    />
                  </div>
                  <div className="w-full mt-3 flex gap-2">
                    <label htmlFor="state" className="sr-only">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="State"
                    />
                    <label htmlFor="zip" className="sr-only">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="Zip Code"
                    />
                  </div>
                  <div className="w-full mt-3">
                    <label htmlFor="zip" className="sr-only">
                      CUSTOM INSTRUCTIONS?
                    </label>
                    <textarea
                      name="instructions"
                      id="instructions"
                      rows={3}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-blue-400 hover:border-blue-600 focus:outline-none"
                      placeholder="CUSTOM INSTRUCTIONS"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )} */}

        {/* <div className="col-span-1">
          <div className="border-2 border-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-base font-semibold leading-6 text-gray-100">INCLUDED FEATURES</h3>
              Map out upcharges (Upcharge = description) and (Value = price)
              {listing?.upcharges[0]}
            </div>
          </div>
        </div> */}

        {/* <div className="col-span-1">
          <div className="border-2 border-blue-400 shadow sm:rounded-lg">
             <div className="px-4 py-5 sm:p-6">
               <h3 className="text-base font-semibold leading-6 text-gray-100">PREMIUM FEATURES</h3>
               Map out upcharges (Upcharge = description) and (Value = price)
               {listing?.upcharges[0]}
             </div>
           </div>
         </div> */}
      </div>

      {WEB3_FUNCTIONALITY && (
        <div className="text-center uppercase mt-8">
          <span className="text-blue-400">Web3 Disclaimer</span>

          <p className="text-gray-400">
            {COMPANY} uses and secures transactions on the Ethereum Blockchain. By purchasing{" "}
            <span className="text-blue-400">{listing.title}</span> you understand the risks of transparent ledgers, how
            your inforamtion and purchase information will be kept in a distributed ledger that anyone can access.
            Although we build this for security, we cannot guarantee the security of the Ethereum Blockchain. Please
            read our policy for more information.
          </p>

          <div>
            <span className="text-blue-400">
              <a href="/blockchain-policy">READ MORE HERE</a>
            </span>
          </div>
        </div>
      )}

      <div className="mt-2 p-2 lg:mt-0 lg:w-full">
        <div className="rounded-2xl lg:pr-10 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="flex w-full items-center justify-center">
            <div className="h-px flex-1 bg-gray-300 mr-2"></div>
            <div className="flex items-center gap-x-2">
              <Button className="inline-flex items-center ring-1 ring-red-300 gap-x-0.5 rounded-md bg-red-800/10 border border-red-900 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-red-700/30 hover:text-white">
                <a href={`/message/`}>BACK TO EXPLORE</a>
              </Button>

              <Button className="inline-flex items-center ring-1 ring-gray-500 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
                <a href={`/share/`}>SHARE LISTING</a>
              </Button>

              {WEB3_FUNCTIONALITY ? (
                <Button
                  onClick={handleBlockchainPurchase}
                  className="inline-flex items-center ring-1 ring-green-400 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white"
                >
                  PURCHASE SERVICE ON BLOCKCHAIN
                </Button>
              ) : (
                <Button className="inline-flex items-center ring-1 ring-gray-500 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
                  <a href={`/purchase/`}>PROCEED TO CHECKOUT</a>
                </Button>
              )}
            </div>
            <div className="h-px flex-1 bg-gray-300 ml-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
