import { hexToU8a } from "@polkadot/util";
import Keyring from "@polkadot/keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { chains } from "@oak-network/config";
import { askScheduleAction } from "../common/utils.js";
import { scheduleTask } from "./common.js";
import Web3 from "web3";
import * as ethers from "ethers";

const web3 = new Web3("http://localhost:8545");

const INCREMENTER_CONTRACT_INPUT = "0xd09de08a";
const INCREMENTER_CONTRACT_ADDRESS =
  "0xc01Ee7f10EA4aF4673cFff62710E1D7792aBa8f3";
const ORACLE_CONTRACT_ADDRESS = "0x970951a12F975E6762482ACA81E57D5A2A4e73F4";

const functionName = "setTokenPrice"; // replace with your function name
const parameterTypes = ["uint256"]; // replace with your parameter types
const parameters = [ethers.parseEther("100")]; // replace with your parameters

// Get the function signature
const functionSignature = web3.eth.abi.encodeFunctionSignature(
  `${functionName}(${parameterTypes.join(",")})`,
);

// Encode the parameters
const encodedParameters = web3.eth.abi.encodeParameters(
  parameterTypes,
  parameters,
);

// Get the input for the contract
const ORACLE_CONTRACT_INPUT = functionSignature + encodedParameters.slice(2); // remove the '0x' prefix from the encoded parameters

// This is a Moonbeam test account private key. Please do not use it for any other purpose.
// https://github.com/moonbeam-foundation/moonbeam/blob/2ea0db7c18d907ddeda1a5f4d3f68262e10560e7/README.md?plain=1#L65
const ALITH_PRIVATE_KEY =
  "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133";

const main = async () => {
  await cryptoWaitReady();
  const keyring = new Keyring({ type: "sr25519" });

  const keyringPair = keyring.addFromUri("//Alice", undefined, "sr25519");
  keyringPair.meta.name = "Alice";

  const moonbeamKeyringPair = keyring.addFromSeed(
    hexToU8a(ALITH_PRIVATE_KEY),
    undefined,
    "ethereum",
  );
  moonbeamKeyringPair.meta.name = "Alith";

  const scheduleActionType = await askScheduleAction();

  const {
    DevChains: { turingLocal, moonbaseLocal },
  } = chains;
  console.log("START: Sheduleing incremneter");
  await scheduleTask({
    oakConfig: turingLocal,
    moonbeamConfig: moonbaseLocal,
    scheduleActionType,
    contract: {
      address: INCREMENTER_CONTRACT_ADDRESS,
      input: INCREMENTER_CONTRACT_INPUT,
    },
    keyringPair,
    moonbeamKeyringPair,
  });
  console.log("DONE: Sheduleing incremneter");

  console.log("START: Sheduleing oracle");
  await scheduleTask({
    oakConfig: turingLocal,
    moonbeamConfig: moonbaseLocal,
    scheduleActionType,
    contract: {
      address: ORACLE_CONTRACT_ADDRESS,
      input: ORACLE_CONTRACT_INPUT,
    },
    keyringPair,
    moonbeamKeyringPair,
  });
  console.log("DONE: Sheduleing oracle");
};

main()
  .catch(console.error)
  .finally(() => {
    console.log("Reached the end of main() ...");
    process.exit();
  });

// INCREMENTER_CONTRACT_ADDRESS=<> ORACLE_CONTRACT_ADDRESS=<> npm run moonbase-local
