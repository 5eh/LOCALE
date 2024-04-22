// src/app/create/form/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Authentication from "~~/app/authentication/page";
import { Listing_Data, Upcharge } from "~~/components/Types/userListingData";
import Footer from "~~/components/footer";
import { Navbar } from "~~/components/navbar";
import { COMPANY, WEB3_FUNCTIONALITY } from "~~/marketplaceVariables";
import createListing from "~~/routes/listings/createListing";


export default function Form() {
  const searchParams = useSearchParams() || new URLSearchParams();
  const serviceTitle = searchParams.get("title");

  return (
    <div className="bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 lg:pt-24">
          <h2 className="pt-4 text-4xl font-bold tracking-tight text-gray-300">
            {(serviceTitle || "Create service").toUpperCase()}
          </h2>
        </div>
      </main>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FormInput serviceTitle={serviceTitle} />
      </div>
      <Footer />
    </div>
  );
}

function FormInput({ serviceTitle }: { serviceTitle: string | null }) {
  const [upcharges, setUpcharges] = useState<Upcharge[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [redirectToSuccess, setredirectToSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState<Omit<Listing_Data, "listingID" | "userID" | "userWallet" | "timeCreated">>({
    title: "",
    description: "",
    price: 0,
    photo: "",
    location: "",
    quantityOfService: 1,
    features: [],
    upcharges: [],
    creator: "",
    serviceType: serviceTitle || "custom",
  });

  const formatDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}/${month}/${day}/${hours}/${minutes}/${seconds}`;
  };

  const optimizeType = (serviceType: string) => {
    const wordsToRemove = ["services"];
    const words = serviceType.split(" ").filter(word => !wordsToRemove.includes(word.toLowerCase()));
    return words.join(" ");
  };
  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    const timeCreated = formatDateTime();
    const userWallet = "0x123456789";

    const completeData = {
      ...formData,
      userWallet,
      timeCreated,
      serviceType: optimizeType(formData.serviceType),
    };

    try {
      const id = await createListing(completeData);
      console.log("Form submission successful. ID:", id);
      setTimeout(() => {
        router.push("/create/success");
      }, 3000);
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (redirectToSuccess) {
      router.push("/create/success");
    }
  }, [redirectToSuccess, router]);

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      upcharges,
    }));
  }, [upcharges]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === "includedFeatureOne" || name === "includedFeatureTwo") {
      const featureIndex = name === "includedFeatureOne" ? 0 : 1;
      const updatedFeatures = [...formData.features];

      const existingFeatureValue = updatedFeatures[featureIndex]?.value || "";

      updatedFeatures[featureIndex] = {
        feature: value,
        value: existingFeatureValue,
      };

      setFormData({
        ...formData,
        features: updatedFeatures,
      });
    } else if (name === "city" || name === "state") {
      const location =
        name === "city"
          ? `${value}, ${formData.location.split(",")[1] || ""}`
          : `${formData.location.split(",")[0] || ""}, ${value}`;
      setFormData({
        ...formData,
        location,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addUpcharge = () => {
    setUpcharges([...upcharges, { upcharge: "", value: "" }]);
  };

  const updateUpchargeValue = (index: number, value: string | number, field: "upcharge" | "value") => {
    const updatedUpcharges = upcharges.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setUpcharges(updatedUpcharges);
  };

  const deleteUpcharge = (index: number) => {
    const newUpcharges = [...upcharges];
    newUpcharges.splice(index, 1);
    setUpcharges(newUpcharges);
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setEmail(userEmail);
  }, []);

  if (!email) {
    return <Authentication />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                TITLE
              </label>
              <div className="mt-2">
                <div className="flex rounded-md pl-2 bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                  <input
                    type="title"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="pl-2  flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Modern Urban Trench Coat"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-white">
                DESCRIPTION
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="pl-2  block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Experience the blend of classic style and modern sustainability with our Modern Urban Trench Coat. Crafted from 100% recycled materials, this coat features a sleek, minimalist design perfect for the urban fashionista. The durable, water-resistant fabric makes it an ideal choice for any weather, while the stylish cut ensures you stay chic and comfortable."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-400">
                Write a few sentences about the service you're providing.
              </p>
            </div>
            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-white">
                PHOTO
              </label>

              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center justify-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                  <div className=" flex text-sm leading-6 text-gray-400">
                    <label
                      htmlFor="photo"
                      className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                    >
                      <span>Upload an image file</span>
                      <input
                        id="photo"
                        name="photo"
                        type="file"
                        className="sr-only"
                        value={formData.photo}
                        onChange={handleInputChange}
                      />
                    </label>
                    <p className="">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-white">
                TOTAL SERVICE PRICE
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="pl-2  block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="$249"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="includedFeatureOne" className="block text-sm font-medium leading-6 text-white">
                INCLUDED FEATURE 1
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="includedFeatureOne"
                  id="includedFeatureOne"
                  autoComplete="given-name"
                  placeholder="Sustainable Materials"
                  className="pl-2  block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  value={formData.features[0]?.feature || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3"></div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                INCLUDED FEATURE 2
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="includedFeatureTwo"
                  id="includedFeatureTwo"
                  placeholder="Fully local team"
                  className="pl-2 block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  value={formData.features[1]?.feature || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                CITY OF SERVICE PROVIDED
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  value={formData.location.split(",")[0] || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-white">
                STATE / PROVINCE OF SERVICE PROVIDED
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  value={(formData.location.split(",")[1] || "").trim()} // Extract state from location
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-base font-semibold leading-7 text-white">EXTRA CONFIGURATION</h2>

        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-400">EMAIL NOTIFICATIONS</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="emailPurchase"
                      name="emailPurchase"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="emailPurchase" className="font-medium text-white">
                      Immediate purchase
                    </label>
                    <p className="text-gray-400">Get notified when someone purchases your service.</p>
                  </div>
                </div>

                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="emailMessage"
                      name="emailMessage"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="emailMessage" className="font-medium text-white">
                      Messages
                    </label>
                    <p className="text-gray-400">Get notified when someone messages you for this service.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-400">PHONE NOTIFICATIONS</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="phonePurchase"
                      name="phonePurchase"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="phonePurchase" className="font-medium text-white">
                      Immediate purchase
                    </label>
                    <p className="text-gray-400">Get notified when someone purchases your service.</p>
                  </div>
                </div>

                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="phoneMessage"
                      name="phoneMessage"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="phoneMessage" className="font-medium text-white">
                      Messages
                    </label>
                    <p className="text-gray-400">Get notified when someone messages you for this service.</p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-400">QUANTITY OF SERVICE</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="quantityOfService"
                      name="quantityOfService"
                      type="checkbox"
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="quantityOfService" className="font-medium text-white">
                      Unlimited
                    </label>
                    <p className="text-gray-400">Your listings will remain public until you delete them.</p>
                  </div>
                </div>

                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center"></div>
                  <div className="text-sm leading-6">
                    <label htmlFor="quantityOfService" className="font-medium text-white">
                      Service Quantity
                    </label>
                    <input
                      type="number"
                      id="quantityOfService"
                      name="quantityOfService"
                      min="1"
                      max="1000"
                      step="1"
                      className="mt-2 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm leading-6 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      placeholder="Enter quantity"
                      value={formData.quantityOfService}
                      onChange={handleInputChange}
                    />
                    <p className="text-gray-400 mt-2">Enter the limit of this service you will provide.</p>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-400">
                PREMIUM UPCHARGES TO THIS LISTING (OPTIONAL)
              </legend>
              <div className="mt-6 space-y-6">
                {upcharges.map((item, index) => (
                  <div key={index} className="relative flex gap-x-3">
                    <input
                      type="text"
                      value={item.upcharge}
                      onChange={e => updateUpchargeValue(index, e.target.value, "upcharge")}
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm leading-6 text-gray-700"
                      placeholder="Extra person in session"
                    />

                    <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-900">
                      Price
                    </label>

                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name={`price-${index}`}
                        id={`price-${index}`}
                        className="block w-full rounded-md border-0 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0.00"
                        aria-describedby={`price-currency-${index}`}
                        value={item.value}
                        onChange={e => updateUpchargeValue(index, e.target.value, "value")}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm" id={`price-currency-${index}`}>
                          USD
                        </span>
                      </div>
                    </div>

                    <button type="button" className="text-gray-200" onClick={() => deleteUpcharge(index)}>
                      Delete
                    </button>
                  </div>
                ))}
                <button type="button" className="text-gray-200" onClick={addUpcharge}>
                  CREATE UPCHARGE
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-x-6 justify-center">
    
        {/* Conditionally post on blockchain IF WEB3_FUNCTIONALITY is set to true */}

        {WEB3_FUNCTIONALITY && (
          <button
            type="submit"
            disabled
            className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {isSubmitting ? "LOADING ... " : "DEPLOY ON BLOCKCHAIN"}
          </button>
        )}

        <button
          type="submit"
          className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm
                    ${isSubmitting ? "bg-gray-500 hover:bg-gray-500" : "bg-indigo-500 hover:bg-indigo-400"}
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-indigo-500`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "LOADING ..." : "CREATE LISTING"}
        </button>
      </div>
      
      {WEB3_FUNCTIONALITY && (
      <div className='text-center uppercase mt-4'>
          <span className='text-blue-400'>Web3 Disclaimer</span>
          
          <p className='text-gray-400'>{COMPANY} is powered and secured by the Ethereum Blockchain. By pressing <span className='text-blue-400'>DEPLOY ON BLOCKCHAIN</span>{" "}
            You understand the risks and considerations when publishing information into a public database. The information you are providing in the form above will be stored in a public ledeger, where anyone has access to this information.
            smart contracts additionally carry risks in the form of bugs, hacks, and other vulnerabilities. By pressing <span className='text-blue-400'>DEPLOY ON BLOCKCHAIN</span>{" "}you are agreeing to these terms and conditions.
          </p>

              <div>
                <span className="text-blue-400">
                  <a href="/blockchain-policy">READ MORE HERE</a>
                </span>
              </div>  
      </div>
      )}
    </form>
  );
}
