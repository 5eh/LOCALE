"use client"
import { useState } from "react";
import { ABI } from "../../lib/abi/xtokensABI.js";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { wagmiConfig } from "~~/services/web3/wagmiConfig.jsx";

// Create X-Tokens contract instance
export default function SendxcUnitToken({ amount }: { amount: number }) {
  const { writeContractAsync } = useWriteContract();
  const [isPending, setIsPending] = useState(false);

  async function transferPaymentToRelay() {
    try {
    setIsPending(true)

    const currencyAddress = "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080"; // xcUNIT address

    // Sends token to address on the Relay Chain (This would be like Sending the Payment to Buyer's Polkadot)
    const destination = [
      1,
      ["0x01c4db7bcb733e117c0b34ac96354b10d47e84a006b9e7e66a229d174e8ff2a06300"],
    ];
    const weight = 304217000;

    const result = await writeContractAsync({
        address: "0x0000000000000000000000000000000000000804",
        abi: ABI,
        functionName: "transfer",
        args: [
          currencyAddress,
          parseEther(amount.toString()),
          destination,
          weight,
        ],
    });

      const reciept = await waitForTransactionReceipt(wagmiConfig, { hash: result });

    console.log(reciept);
}catch(err){
    console.log(err)
} finally {
    setIsPending(false)
}
  }

  return (
    <div>
      <button type="button" onClick={async () => {await transferPaymentToRelay()}} disabled={isPending}>Make Payment</button>
    </div>
  );
}
