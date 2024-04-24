import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("CommerceContract", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const yourContract = await hre.ethers.getContract<Contract>("CommerceContract", deployer);
  console.log("📜 COMMERCE Contract Address:", yourContract.target, "📜");

};

export default deployYourContract;

deployYourContract.tags = ["CommerceContract"];
