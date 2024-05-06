// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/wenGame/DPSCartographer.sol";

contract AnvilScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("ANVIL_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        DPSCartographer nft = new DPSCartographer(msg.sender);

        vm.stopBroadcast();
    }
}

