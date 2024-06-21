import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import React from "react";

const page = () => {
  return (
    <div className="ml-96 mt-32">
      <div className="w-fit max-w-96 min-h-32 border rounded pl-4 pr-4 pb-4 pt-4 border-primary/90 bg-primary/30 backdrop-blur-xl cursor-crosshair hover:bg-primary/30 transition hover:ease-out ">
        <h1 className="text-xl uppercase font-medium mt-2 mb-2 pt-1 pl-4 text-primary"> MONISWAP </h1>
        <div className="w-full align-middle justify-center bg-primary/80 m-0 p-[1px]" />
        <p className=" mt-2 mb-0 pt-1 pb-1 pl-2 pr-2 text-gray-800 hover:text-black transition">
          The central trading and liquidity platform marketplace on Berachain
        </p>
        <div className="pl-2 pr-2 pt-4 pb-4 flex gap-1">
          <button className="justify-between align-baseline flex w-fit min-w-32 max-w-64 pl-2 pr-2 pt-1 pb-1 bg-primary/40 border border-primary/50 hover:border-primary/85 hover:bg-primary/20 transition hover:ease-in-out">
            <div className="w-half">SWAP</div>
            <div className=" w-half">
              <ArrowUpRightIcon className="w-5 h-5" />
            </div>
          </button>
          <button
            className="w-fit max-w-32 m-1 text-gray-800
            hover:underline hover:text-primary/80 transition hover:ease-in-out
            "
          >
            Guides
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
