//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "hardhat/console.sol";


contract FrankContract {
	uint256 public totalCounter = 0;	

	function incrementCounter() public {
		totalCounter++;
		console.log("Counter incremented to: ", totalCounter);
	}

	function decrementCounter() public {
		totalCounter--;
		console.log("Counter decremented to: ", totalCounter);
	}

	function getTotalCounter() public view returns (uint256) {
		return totalCounter;
	}
}
