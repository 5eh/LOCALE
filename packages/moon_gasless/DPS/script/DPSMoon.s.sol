// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Script.sol";
import "../src/wenGame/DPSCartographer.sol";

contract MoonScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("MOON_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        DPSCartographer dps = new DPSCartographer(msg.sender);

        vm.stopBroadcast();
    }
}

