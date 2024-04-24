"use client";

import React, { useEffect, useState } from "react";
import { parseEther } from "viem";
import { Button } from "~~/components/buttons/Button";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Page = () => {
  const [counter, setCounter] = useState(""); // Initialize counter as an empty string or perhaps as 0, based on your use case

  const { data: totalCounter } = useScaffoldReadContract({
    contractName: "FrankContract",
    functionName: "getTotalCounter",
  });

  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("FrankContract");

  const increase = async () => {
    try {
      await writeYourContractAsync({
        functionName: "incrementCounter",
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  };

  useEffect(() => {
    if (totalCounter) {
      setCounter(totalCounter.toString());
      console.log("Counter updated:", counter);
    }
  }, [totalCounter]);

  return (
    <div className="justify-center mt-24">
      <div>My fun Frank fantasticly amazing counter</div>
      <div className="text-white">{counter}</div>

      <Button onClick={increase} className="btn btn-primary">Increase</Button>
    </div>
  );
};

export default Page;
