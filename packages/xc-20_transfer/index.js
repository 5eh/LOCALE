import { ApiPromise, WsProvider, Keyring } from "@polkadot/api"; // Version 9.13.6

const providerWsURL = "wss://wss.api.moonbase.moonbeam.network";
const privateKey = "INSERT_PRIVATE_KEY";
const relayAccount =
  "0xc4db7bcb733e117c0b34ac96354b10d47e84a006b9e7e66a229d174e8ff2a063";
const alithPublicKey =
  "0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d";

const alithPolkadotAddress = "";
const benPolkadotAddress = "";
const currencyId = {
  SelfReserve: {},
};
const amount = 1000000000000n;

// https://docs.moonbeam.network/builders/interoperability/xcm/core-concepts/multilocations/#__tabbed_5_1

// Targeting a Relaychain from A Pararchain
// const dest = {
//   V3: {
//     parents: 1,
//     interior: Here,
//   },
// };

// Target an Account on the Relay Chain from Moonbeam
const dest = {
  V3: {
    parents: 1,
    interior: { X1: { AccountId32: { id: benPolkadotAddress } } },
  },
};

const keyring = new Keyring({ type: "ethereum" });
const alith = keyring.addFromUri(privateKey);

const destWeightLimit = { Unlimited: null };

const sendXc20 = async () => {
  // 3. Create Substrate API provider
  const substrateProvider = new WsProvider(providerWsURL);
  const api = await ApiPromise.create({ provider: substrateProvider });

  // 4. Craft the extrinsic
  const tx = api.tx.xTokens.transfer(currencyId, amount, dest, destWeightLimit);

  // 5. Send the transaction
  const txHash = await tx.signAndSend(alith);
  console.log(`Submitted with hash ${txHash}`);

  api.disconnect();
};

sendXc20();

// https://docs.astar.network/docs/learn/interoperability/xcm/building-with-xcm/xc-remote-transact
