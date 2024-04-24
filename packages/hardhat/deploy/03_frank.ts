import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";


const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("FrankContract", {
    from: deployer,
    log: true,
    autoMine: true,
  });

  const yourContract = await hre.ethers.getContract<Contract>("FrankContract", deployer);
  console.log("📜 FRANK Contract Address:", yourContract.target, "📜");

};

export default deployYourContract;

deployYourContract.tags = ["FrankContract"];
