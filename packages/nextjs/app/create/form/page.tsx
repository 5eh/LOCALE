"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Authentication from "~~/app/authentication/page";
import { Listing_Data, Upcharge } from "~~/components/Types/userListingData";
import { Button } from "~~/components/buttons/Button";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { COMPANY, WEB3_FUNCTIONALITY } from "~~/marketplaceVariables";
import createListing from "~~/routes/listings/createListing";
import creators from "~~/routes/listings/creators";

export default function Form() {
  const searchParams = useSearchParams() || new URLSearchParams();
  const serviceTitle = searchParams.get("title");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
      <FormInput serviceTitle={serviceTitle} />
    </div>
  );
}

function FormInput({ serviceTitle }: { serviceTitle: string | null }) {
  const [upcharges, setUpcharges] = useState<Upcharge[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [redirectToSuccess, setredirectToSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [creator, setCreator] = useState("");
  const { address } = useAccount();

  const [formData, setFormData] = useState<Omit<Listing_Data, "listingID" | "userID" | "userWallet" | "timeCreated">>({
    title: "",
    description: "",
    price: 0,
    photo: "https://images.halloweencostumes.co.uk/products/41043/1-1/mens-prehistoric-t-rex-costume.jpg",
    location: "",
    quantityOfService: 5,
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

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setEmail(userEmail);
  }, []);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const fetchedCreatorsData = await creators();
        const matchingCreator = fetchedCreatorsData.find(
          creator => creator.email === localStorage.getItem("userEmail"),
        );
        setCreator(matchingCreator?._id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCreator();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(true);

    const timeCreated = formatDateTime();
    const userWallet = address;

    const completeData = {
      ...formData,
      userWallet,
      timeCreated,
      creator,
      serviceType: optimizeType(formData.serviceType),
    };

    try {
      const id = await createListing(completeData);
      console.log("Form submission successful. ID:", id);
      setTimeout(() => {
        router.push(`/create/success/${id}`);
      }, 3000);
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (redirectToSuccess) {
      router.push("/create/success/[id]");
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

  const updateUpchargeValue = (index, value, field) => {
    const updatedValue = field === "value" ? Number(value) : value;
    const updatedUpcharges = upcharges.map((item, i) => (i === index ? { ...item, [field]: updatedValue } : item));
    setUpcharges(updatedUpcharges);
  };

  const deleteUpcharge = (index: number) => {
    const newUpcharges = [...upcharges];
    newUpcharges.splice(index, 1);
    setUpcharges(newUpcharges);
  };

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("CommerceContract");

  const handleBlockchainSubmit = async () => {
    if (!formData.title || !formData.description || !formData.price || !formData.quantityOfService || !formData.photo) {
      console.error("All fields must be filled out");
      return;
    }

    try {
      const timeCreated = new Date().toISOString();
      const completeData = {
        ...formData,
        timeCreated,
        creator,
        userWallet: address,
      };

      const listingID = await createListing(completeData);
      console.log("Form submission successful. ID:", listingID);

      const imageHash = "yourImageHashingLogicHere";

      const args = [
        formData.title,
        formData.description,
        parseInt(formData.price, 10),
        parseInt(formData.quantityOfService, 10),
        formData.serviceType,
        imageHash,
        listingID,
      ];

      await writeYourContractAsync({
        functionName: "createProduct",
        args: args,
        overrides: {
          gasLimit: 300000, // Adjust gas limit as needed
        },
      });

      console.log("Product created on blockchain with listing ID:", listingID);
      router.push(`/create/success/${listingID}`);
    } catch (error) {
      console.error("Error during form handling:", error);
      setIsSubmitting(false); // Update submission state
    }
  };

  if (!email) {
    return <Authentication />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                TITLE
              </label>
              <div className="mt-2">
                <input
                  type="title"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="text-left border-b border-gray-900  dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                  placeholder="Modern Urban Trench Coat"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 ">
                DESCRIPTION
              </label>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Write a few sentences about the service you're providing.
              </p>

              <textarea
                id="description"
                name="description"
                rows={3}
                className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                placeholder="Experience the blend of classic style and modern sustainability with our Modern Urban Trench Coat. Crafted from 100% recycled materials, this coat features a sleek, minimalist design perfect for the urban fashionista. The durable, water-resistant fabric makes it an ideal choice for any weather, while the stylish cut ensures you stay chic and comfortable."
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                PHOTO
              </label>

              <label
                htmlFor="photo"
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900 dark:border-white/25 px-6 py-10 cursor-pointer"
              >
                <div className="text-center justify-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                  <div className="text-sm leading-6 text-gray-400">
                    <span className="relative font-semibold text-gray-900 dark:text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-primary">
                      Upload an image file
                    </span>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      className="sr-only"
                      // value={formData.photo}
                      // onChange={handleInputChange}
                    />
                    <p>or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                TOTAL PRICE
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="text-left border-b border-gray-900  dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                  placeholder="$249"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <span> IN WEI </span>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="includedFeatureOne"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                INCLUDED FEATURE 1
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="includedFeatureOne"
                  id="includedFeatureOne"
                  autoComplete="given-name"
                  placeholder="Sustainable Materials"
                  className="text-left border-b border-gray-900  dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                  value={formData.features[0]?.feature || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-3"></div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                INCLUDED FEATURE 2
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="includedFeatureTwo"
                  id="includedFeatureTwo"
                  placeholder="Fully local team"
                  className="text-left border-b border-gray-900  dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
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
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                CITY
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Austin"
                  autoComplete="address-level2"
                  className="text-left border-b border-gray-900  dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                  value={formData.location.split(",")[0] || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                STATE / PROVINCE
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  placeholder="Texas"
                  className="text-left border-b border-gray-900  dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                  value={(formData.location.split(",")[1] || "").trim()} // Extract state from location
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">EXTRA CONFIGURATION</h2>

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
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary/60 focus:ring-primary/60 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="emailPurchase" className="font-medium text-gray-900 dark:text-white">
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
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary/60 focus:ring-primary/60 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="emailMessage" className="font-medium text-gray-900 dark:text-white">
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
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary/60 focus:ring-primary/60 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="phonePurchase" className="font-medium text-gray-900 dark:text-white">
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
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary/60 focus:ring-primary/60 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="phoneMessage" className="font-medium text-gray-900 dark:text-white">
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
                      className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary/60 focus:ring-primary/60 focus:ring-offset-gray-900"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="quantityOfService" className="font-medium text-gray-900 dark:text-white">
                      Unlimited
                    </label>
                    <p className="text-gray-400">Your listings will remain public until you delete the post.</p>
                  </div>
                </div>

                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center"></div>
                  <div className="text-sm leading-6">
                    <label htmlFor="quantityOfService" className="font-medium text-gray-900 dark:text-white">
                      QUANTITY
                    </label>
                    <input
                      type="number"
                      id="quantityOfService"
                      name="quantityOfService"
                      min="1"
                      max="9999"
                      step="1"
                      className="text-left border-b border-gray-900  dark:border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-800 dark:text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                      placeholder="Enter quantity"
                      value={formData.quantityOfService}
                      onChange={handleInputChange}
                    />
                    <p className="text-gray-400 mt-2">Available quantity.</p>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-400">
                PREMIUM UPCHARGES TO THIS LISTING <span className="text-gray-500">(OPTIONAL)</span>
              </legend>
              <div className="mt-6 space-y-6">
                {upcharges.map((item, index) => (
                  <div key={index} className="relative flex gap-x-1 items-center">
                    <input
                      type="text"
                      value={item.upcharge}
                      onChange={e => updateUpchargeValue(index, e.target.value, "upcharge")}
                      className="text-left border border-gray-200/20 w-full bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/60 hover:border-primary/60 focus:outline-none"
                      placeholder="Extra product half off"
                    />

                    <div className="relative flex-1">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-300 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        value={item.value}
                        onChange={e => updateUpchargeValue(index, e.target.value, "value")}
                        className="text-right border border-gray-200/20 bg-gray-500/20 py-2 px-3 text-sm leading-6 text-gray-300 focus:bg-gray-700/20 focus:border-primary/40 hover:border-primary/60 focus:outline-none"
                        placeholder=""
                      />
                      {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm" id={`price-currency-${index}`}>
                          USD
                        </span>
                      </div> */}
                    </div>

                    <button
                      type="button"
                      className="text-gray-900 dark:text-white dark:hover:text-primary/40"
                      onClick={() => deleteUpcharge(index)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button type="button" className="text-gray-900 dark:text-white" onClick={addUpcharge}>
                  CREATE UPCHARGE
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-x-6 justify-center">
        {WEB3_FUNCTIONALITY && (
          <button
            type="button"
            onClick={handleBlockchainSubmit}
            className={`border border-gray-200/20 bg-gray-500/20 hover:border-green-600 text-right py-2 px-3 text-sm font-semibold text-gray-300
              ${isSubmitting ? "bg-gray-700/20" : "focus:bg-gray-700/20 focus:border-green-400"}
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-500`}
          >
            {isSubmitting ? "LOADING ... " : "DEPLOY ON BLOCKCHAIN"}
          </button>
        )}

        {/*               <Button className="inline-flex items-center ring-1 ring-gray-500 
        gap-x-0.5 rounded-md bg-gray-800 border border-gray-700
         px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white">
         */}
        <button
          type="submit"
          className={`border border-gray-200/20 bg-gray-500/20 hover:border-blue-600 text-right py-2 px-3 text-sm font-semibold text-gray-300
              ${isSubmitting ? "bg-gray-700/20" : "focus:bg-gray-700/20 focus:border-blue-400"}
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-indigo-500`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "LOADING ..." : "CREATE LISTING"}
        </button>
      </div>

      {WEB3_FUNCTIONALITY && (
        <div className="text-center uppercase mt-4">
          <span className="text-primary">Web3 Disclaimer</span>

          <p className="text-gray-400">
            {COMPANY} is powered and secured by the Ethereum Blockchain. By pressing{" "}
            <span className="text-primary">DEPLOY ON BLOCKCHAIN</span> You understand the risks and considerations when
            publishing information into a public database. The information you are providing in the form above will be
            stored in a public ledger, where anyone has access to this information. smart contracts additionally carry
            risks in the form of bugs, hacks, and other vulnerabilities. By pressing{" "}
            <span className="text-primary">DEPLOY ON BLOCKCHAIN</span> you are agreeing to these terms and conditions.
          </p>

          <div>
            <span className="text-primary">
              <a href="/blockchain-policy">READ MORE HERE</a>
            </span>
          </div>
        </div>
      )}
    </form>
  );
}
