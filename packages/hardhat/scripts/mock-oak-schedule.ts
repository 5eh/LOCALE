// Import ethers library
import * as ethers from "ethers";
// Set up provider (using Alchemy, Infura, etc.)
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as string;

const wallet = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider);
// Set your contract's deployed address
const contractAddress = "your_contract_address_here";

// ABI array of the contract
const contractABI = ["function increment() public", "function getNumber() public view returns(uint)"];

async function main() {
  // Create a contract instance
  const incrementerContract = new ethers.Contract(contractAddress, contractABI, wallet);

  try {
    console.log("Schedule Calling Increment");
    await incrementerContract.increment();

    const newCount = await incrementerContract.getNumber();

    console.log("New Count Number: ", newCount.toString());
  } catch (error) {
    console.error("Error:", error);
  }
}

// main();

setInterval(main, 1000 * 60 * 2);

// npx hardhat run ./scripts/mock-oak-schedule.ts
