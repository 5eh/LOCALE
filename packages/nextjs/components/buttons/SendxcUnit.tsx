"use client";

import { useState } from "react";
import { ABI } from "../../lib/abi/xtokensABI.js";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { wagmiConfig } from "~~/services/web3/wagmiConfig.tsx";

// Create X-Tokens contract instance
export default function SendxcUnitToken({ amount }: { amount: number }) {
  const { writeContractAsync } = useWriteContract();
  const [isPending, setIsPending] = useState(false);

  async function transferPaymentToRelay() {
    try {
      setIsPending(true);

      const currencyAddress = "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080"; // xcUNIT address

      // Sends token to address on the Relay Chain (This would be like Sending the Payment to Buyer's Polkadot)
      const destination = [1, ["0x01c4db7bcb733e117c0b34ac96354b10d47e84a006b9e7e66a229d174e8ff2a06300"]];
      const weight = 304217000;

      const result = await writeContractAsync({
        address: "0x0000000000000000000000000000000000000804",
        abi: ABI,
        functionName: "transfer",
        args: [currencyAddress, amount, destination, weight],
      });

      const reciept = await waitForTransactionReceipt(wagmiConfig, { hash: result });

      console.log(reciept);
    } catch (err) {
      console.log(err);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={async () => {
        await transferPaymentToRelay();
      }}
      disabled={isPending}
      className="inline-flex items-center ring-1 ring-green-400 gap-x-0.5 rounded-md bg-gray-800 border border-gray-700 px-2 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white"
    >
      Pay from Moonbase Alpha
    </button>
  );
}
