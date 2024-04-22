// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

contract ServiceContract {
    // Mapping to hold all service listings, accessible by a unique ID
    mapping(string => ServiceData) public services;

    // Event that is emitted whenever a new service is listed
    event ServiceListed(string listingID, address owner, uint32 price, uint32 quantity);

    // Event for the service booking
    event ServicePurchased(string listingID, address buyer, uint32 quantity);

    // Event for confirming service completion and transferring the funds to the provider
    event ServiceCompleted(string listingID, address owner);

    struct ServiceData {
        string title;
        string description;
        uint32 price;
        uint32 quantity;
        string formSelectionType;
        string image;
        address payable creatorWallet;
        bool isCompleted;
    }

    // Function to create a new service listing
    function createService(
        string memory _title, 
        string memory _description, 
        uint32 _price, 
        uint32 _quantity, 
        string memory _formSelectionType, 
        string memory _image, 
        string memory _listingID
    ) public {
        require(services[_listingID].creatorWallet == address(0), "Listing ID already exists");
        services[_listingID] = ServiceData({
            title: _title,
            description: _description,
            price: _price,
            quantity: _quantity,
            formSelectionType: _formSelectionType,
            image: _image,
            creatorWallet: payable(msg.sender),
            isCompleted: false
        });

        emit ServiceListed(_listingID, msg.sender, _price, _quantity);
    }

    // Function for customers to book services
    function purchaseService(string memory _listingID, uint32 _quantity) public payable {
        ServiceData storage service = services[_listingID];
        require(_quantity <= service.quantity, "Not enough capacity available");
        require(msg.value == service.price * _quantity, "Incorrect amount of Ether sent");
        service.quantity -= _quantity;

        emit ServicePurchased(_listingID, msg.sender, _quantity);
    }

    // Function for service providers to confirm completion and receive payment
    function confirmServiceCompletion(string memory _listingID) public {
        ServiceData storage service = services[_listingID];
        require(msg.sender == service.creatorWallet, "Only the service provider can confirm completion");
        require(!service.isCompleted, "Service already completed");

        service.isCompleted = true;
        service.creatorWallet.transfer(address(this).balance);

        emit ServiceCompleted(_listingID, msg.sender);
    }
}
