import { expect } from "chai";
import { ethers } from "hardhat";
import { FrankContract } from "../typechain-types";

describe("FrankContract", function () {
  let yourContract: FrankContract;
  let owner;

  // Setup the contract instance before running tests
  before(async () => {
    [owner] = await ethers.getSigners();
    const yourContractFactory = await ethers.getContractFactory("FrankContract");
    yourContract = (await yourContractFactory.deploy()) as FrankContract;
    await yourContract.waitForDeployment();
  });

  describe("Initial State", function () {
    it("should start with a total counter of 0", async function () {
      expect(await yourContract.getTotalCounter()).to.equal(0);
    });
  });

  describe("Increment Counter", function () {
    it("should increment the counter by 1", async function () {
      await yourContract.incrementCounter();
      expect(await yourContract.getTotalCounter()).to.equal(1);
    });
  });

  describe("Decrement Counter", function () {
    it("should decrement the counter by 1", async function () {
      // First, ensure there's something to decrement from
      await yourContract.incrementCounter(); // this should make counter = 2
      await yourContract.decrementCounter(); // should decrement it back to 1
      expect(await yourContract.getTotalCounter()).to.equal(1);
    });
  });
});
