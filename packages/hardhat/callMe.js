// Import ethers library
const { ethers } = require("ethers");

// Set up provider (using Alchemy, Infura, etc.)
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

// Set your contract's deployed address
const contractAddress = "your_contract_address_here";

// ABI array of the contract
const contractABI = [
    "function getTotalCounter() public view returns (uint256)"
];

async function main() {
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {
        // Call getTotalCounter() from your contract
        const totalCounter = await contract.getTotalCounter();
        console.log("Total Counter:", totalCounter.toString());
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
