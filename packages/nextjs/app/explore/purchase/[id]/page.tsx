// src/app/purchase/[id]/page.tsx
'use client'

import { Navbar } from '@/components/navbar';
import Footer from '@/components/footer'
import { PaperclipIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import PreviewCard from './previewCard';
import { Button } from '@/components/buttons/Button'
import { Service_Provider } from '@/components/Types/publicUserData';
import { Listing_Data } from '@/components/Types/userListingData';
import { userTestData, listingTestData } from '@/components/Types/userTestData'
import { useRouter } from 'next/router'

interface DataProps {
  creator: Service_Provider | undefined | null;
  listing: Listing_Data;
}

function Purchase({ creator, listing }: DataProps) {
  const [time, setTime] = useState('');

  const handleTimeChange = (event) => {
    const [hours, minutes] = event.target.value.split(':').map(Number);
    const roundedMinutes = Math.round(minutes / 15) * 15;
    const newTime = `${String(hours).padStart(2, '0')}:${String(roundedMinutes).padStart(2, '0')}`;
    setTime(newTime);
  };

  if (!listing) {
    return <div>Loading...</div>;
  }
  return (
    <div className='bg-gray-900'>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav
          className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
          aria-label='Global'
        >
          <div className='flex lg:flex-1'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Arthur Labs</span>
              <img />
            </a>
          </div>
          <Navbar />
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'></div>
        </nav>
      </header>

      <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 lg:pt-24'>
          <h2 className='pt-4 text-4xl font-bold tracking-tight text-gray-300'>
            PURCHASE
          </h2>
        </div>
      </main>

      <div id='main' className='mx-auto lg:mt-8 lg:pt-8 max-w-7xl px-4 sm:px-6 lg:px-2'>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">

          <div className='col-span-1'>
            <PreviewCard creator={userTestData[listing.creator]} listing={listing} />
          </div>

          <div className='px-4 sm:px-0'>
            <div className="mt-6 border-t border-white/10">
              <dl className="divide-y divide-white/10">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">FULL NAME</dt>
                  <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">Mary Jane</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">EARNINGS RATE</dt>
                  <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">$TOTAL - TAX - TX FEE</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">VERIFICATIONS</dt>
                  <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    Email. Phone, ID
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">CREATED AN ACCOUNT IN</dt>
                  <dd className="mt-1 text-sm text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">2023</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b border-white/10">
                  <dt className="text-sm font-medium leading-6 text-white">ABOUT</dt>
                  <dd className="mt-1 text-sm  text-right leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                  </dd>
                </div>

              </dl>
            </div>
          </div>

          {/* DISABLE FOLLOWING FUNCTION UNLESS SERVICE MARKETPLACE */}
          <div className='col-span-1'>
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
                      onChange={handleTimeChange}
                      className="block rounded-md border border-gray-700 px-2 py-1 text-xs font-medium text-white bg-gray-800 shadow-sm ring-1 ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 hover:bg-gray-700 hover:text-white"
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
                      className="block rounded-md border border-gray-700 px-2 py-1 text-xs font-medium text-white bg-gray-800 shadow-sm ring-1 ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 hover:bg-gray-700 hover:text-white"
                      placeholder="Select Date"
                    />
                  </div>
                  <div className="w-full mt-3">
                    <label htmlFor="description" className="sr-only">
                      DESCRIPTION
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="block w-full rounded-md border border-gray-700 px-2 py-1 text-xs font-medium text-white bg-gray-800 shadow-sm ring-1 ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 hover:bg-gray-700 hover:text-white"
                      placeholder="Please expect a party of 3 people. We will be bringing our dog. It's our sisters birthday, so we would like to take some photos with her."
                    />
                  </div>
                </form>


              </div>
            </div>
          </div>

          <div className='col-span-1'>
            <div className="border-2 border-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-gray-100">PREMIUM FEATURES</h3>

                LIST OF PREMIUM FEATURES

              </div>
            </div>
          </div>


        </div>



        <div className='mt-2 p-2 lg:mt-0 lg:w-full'>
          <div className='rounded-2xl lg:pr-10 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16'>

            <div className='flex w-full items-center justify-center'>
              <div className='h-px flex-1 bg-gray-300 mr-2'></div>
              <div className='flex items-center gap-x-2'>

                <Button className='inline-flex items-center ring-1 ring-red-300 gap-x-0.5 rounded-md bg-red-800/10 border border-red-900 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-red-700/30 hover:text-white'>
                  <a href={`/message/`}>
                    BACK TO EXPLORE
                  </a>
                </Button>



                <Button className='inline-flex items-center ring-1 ring-gray-500 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white'>
                  <a href={`/message/`}>
                    SHARE LISTING
                  </a>
                </Button>

                <Button className='inline-flex items-center ring-1 ring-gray-500 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white'>
                  <a href={`/purchase/`}>
                    PROCEED TO CHECKOUT
                  </a>
                </Button>
              </div>

              <div className='h-px flex-1 bg-gray-300 ml-2'></div></div>
          </div>



        </div>





      </div>

      <Footer />


    </div>
  );
}

export default Purchase;
