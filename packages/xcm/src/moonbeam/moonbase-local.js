import { askScheduleAction } from "../common/utils";
import { scheduleTask } from "./common";
import { chains } from "@oak-network/config";
import Keyring from "@polkadot/keyring";
import { hexToU8a } from "@polkadot/util";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import Web3 from "web3";

// const web3 = new Web3("http://localhost:8545");
// const functionName = "increment";
// const functionSignature = web3.eth.abi.encodeFunctionSignature(
//   `${functionName}()`
// );

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const CONTRACT_INPUT = "0xd09de08a";
// const CONTRACT_INPUT = functionSignature.slice(2);

// This is a Moonbeam test account private key. Please do not use it for any other purpose.
// https://github.com/moonbeam-foundation/moonbeam/blob/2ea0db7c18d907ddeda1a5f4d3f68262e10560e7/README.md?plain=1#L65
const ALITH_PRIVATE_KEY =
  "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133";

const main = async () => {
  console.log(`Our contract Adress is the following: ${CONTRACT_ADDRESS}`);
  await cryptoWaitReady();
  const keyring = new Keyring({ type: "sr25519" });

  const keyringPair = keyring.addFromUri("//Alice", undefined, "sr25519");
  keyringPair.meta.name = "Alice";

  const moonbeamKeyringPair = keyring.addFromSeed(
    hexToU8a(ALITH_PRIVATE_KEY),
    undefined,
    "ethereum"
  );
  moonbeamKeyringPair.meta.name = "Alith";

  const scheduleActionType = await askScheduleAction();

  const {
    DevChains: { turingLocal, moonbaseLocal },
  } = chains;
  await scheduleTask({
    oakConfig: turingLocal,
    moonbeamConfig: moonbaseLocal,
    scheduleActionType,
    contract: { address: CONTRACT_ADDRESS, input: CONTRACT_INPUT },
    keyringPair,
    moonbeamKeyringPair,
  });
};

main()
  .catch(console.error)
  .finally(() => {
    console.log("Reached the end of main() ...");
    process.exit();
  });
