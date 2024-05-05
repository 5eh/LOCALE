const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DPSModule", (m) => {
  const deployer = m.getAccount(0);

  const dps = m.contract("DPSCartographer", [deployer], {
    from: deployer,
  });

  return { dps };
});
