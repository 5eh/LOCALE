/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-ignition-ethers");

const privateKey =
  "0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133";

module.exports = {
  solidity: "0.8.24",
  networks: {
    dev: {
      url: "http://127.0.0.1:9944", // Insert your RPC URL here
      chainId: 1281, // (hex: 0x501),
      accounts: [privateKey],
    },
    moonbase: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      chainId: 1287, // 0x507 in hex,
      accounts: [privateKey],
    },
  },
};
