// 1. Import ethers
import { ethers } from "ethers";

const USER_SIGNER_PRIVATE_KEY = process.env.USER_SIGNER_PRIVATE_KEY;
const THIRD_PARTY_GAS_SIGNER = process.env.THIRD_PARTY_GAS_SIGNER;

// 2. Define network configurations
const providerRPC = {
  dev: {
    name: "moonbeam-development",
    rpc: "http://127.0.0.1:9944",
    chainId: 1281, // 0x501 in hex,
  },
};
// 3. Create ethers provider
const provider = new ethers.JsonRpcProvider(providerRPC.dev.rpc, {
  chainId: providerRPC.dev.chainId,
  name: providerRPC.dev.name,
});

const userSigner = new ethers.Wallet("INSERT_PRIVATE_KEY", provider);
const thirdPartyGasSigner = new ethers.Wallet("INSERT_PRIVATE_KEY", provider);
