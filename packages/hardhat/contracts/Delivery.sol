// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

contract PackageDeliveryContract {
    // Basic info about each package
    struct Package {
        string title;
        string description;
        uint256 price;
        address sender;
        address recipient;
        string locationA;
        string locationB;
        bool isDelivered;
    }

    mapping(uint => Package) public packages;
    uint public nextPackageId;

    event PackageCreated(uint packageId, address sender, string locationA, string locationB);
    event PackageDelivered(uint packageId, address recipient);

    // Create a new package to be sent
    function createPackage(
        string memory _title, 
        string memory _description, 
        uint256 _price, 
        address _recipient, 
        string memory _locationA, 
        string memory _locationB
    ) public {
        packages[nextPackageId] = Package({
            title: _title,
            description: _description,
            price: _price,
            sender: msg.sender,
            recipient: _recipient,
            locationA: _locationA,
            locationB: _locationB,
            isDelivered: false
        });
        emit PackageCreated(nextPackageId, msg.sender, _locationA, _locationB);
        nextPackageId++;
    }

    // Mark a package as delivered
    function deliverPackage(uint _packageId) public {
        Package storage p = packages[_packageId];
        require(msg.sender == p.recipient, "Only recipient can confirm delivery.");
        require(!p.isDelivered, "Package already delivered.");

        p.isDelivered = true;
        emit PackageDelivered(_packageId, msg.sender);
    }
}
