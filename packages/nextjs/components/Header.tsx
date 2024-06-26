"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SwitchTheme } from "./SwitchTheme";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { MARKETPLACE_HEADER, MARKETPLACE_NAME } from "~~/marketplaceVariables";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [];

export const Header = () => {
  return (
    <div className="static top-0 navbar min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-primary px-0 sm:px-2 ">
      <div className="navbar-start w-1/2">
        <Link href="/" passHref className="flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-12 h-12 bg-black rounded">
            <Image alt={`${MARKETPLACE_NAME} LOGO`} className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">{MARKETPLACE_NAME}</span>
            <span className="text-xs">{MARKETPLACE_HEADER}</span>
          </div>
        </Link>
      </div>
      <div className="navbar-end flex-grow mr-4 gap-3">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
        <SwitchTheme />
      </div>
    </div>
  );
};
