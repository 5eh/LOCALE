const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const deployMyToken = async () => {
  const Contract = await ethers.getContractFactory("MyToken");
  console.log(`Deploying MyToken...`);
  const contract = await Contract.deploy(100);
  const address = await contract.getAddress();
  console.log(`MyToken deployed to: `, address);
};

const deployLock = async () => {
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const ONE_GWEI = 1_000_000_000;
  const lockedAmount = ONE_GWEI;
  const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
  const Lock = await ethers.getContractFactory("Lock");
  console.log(`Deploying Lock...`);
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  const address = await lock.getAddress();
  console.log(`Lock deployed to: `, address);
};

const deployDPS = async () => {
  const [owner, otherAccount] = await ethers.getSigners();
  const DPSCartographer = await ethers.getContractFactory("DPSCartographer");
  console.log(`Deploying DPSCartographer...`);
  const dpsCartographer = await DPSCartographer.deploy(owner);
  const address = await dpsCartographer.getAddress();
  console.log(`DPSCartographer deployed to: `, address);
};

async function main() {
  await deployMyToken();
  await deployLock();
  await deployDPS();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
