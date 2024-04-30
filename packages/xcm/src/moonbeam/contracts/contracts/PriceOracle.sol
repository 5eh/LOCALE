//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract PriceOracle {
    uint256 public price;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setTokenPrice(uint256 _price) public {
        // require(msg.sender == owner, "Not the owner");
        price = _price;
    }

    function getTokenPrice() public view returns (uint256) {
        return price;
    }
}
