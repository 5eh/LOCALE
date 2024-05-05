const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const deployContract = async (contractName) => {
  // 1. Get the contract to deploy
  const Contract = await ethers.getContractFactory(contractName);
  console.log(`Deploying ${contractName}...`);

  // 2. Instantiating a new Box smart contract
  const contract = await Contract.deploy();

  // 3. Waiting for the deployment to resolve
  await contract.deployed();

  // 4. Use the contract instance to get the contract address
  console.log(`${contractName} deployed to: `, contract.address);
};

const deployLock = async () => {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const ONE_GWEI = 1_000_000_000;

  const lockedAmount = ONE_GWEI;
  const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

  // Contracts are deployed using the first signer/account by default
  const [owner, otherAccount] = await ethers.getSigners();

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  const address = await lock.getAddress();
  // lock.deployed();

  // 4. Use the contract instance to get the contract address
  console.log(`Lock deployed to: `, address);
};

async function main() {
  // await deployContract('Box');
  // await deployContract("MyToken");
  await deployLock();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
