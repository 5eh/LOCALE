// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

contract CommerceContract {
    // Mapping to hold all product listings, accessible by a unique ID
    mapping(string => ProductData) public products;

    // Event that is emitted whenever a new product is listed
    event ProductListed(string listingID, address owner, uint32 price, uint32 quantity);

    // Event for the product purchase
    event ProductPurchased(string listingID, address buyer, uint32 quantity);

    // Event for confirming delivery and transferring the funds to the seller
    event DeliveryConfirmed(string listingID, address owner);

    struct ProductData {
        string title;
        string description;
        uint32 price;
        uint32 quantity;
        string formSelectionType;
        string image;
        address payable creatorWallet;
        bool isDelivered;
    }

    // Function to create a new product listing
    function createProduct(
        string memory _title, 
        string memory _description, 
        uint32 _price, 
        uint32 _quantity, 
        string memory _formSelectionType, 
        string memory _image, 
        string memory _listingID
    ) public {
        require(products[_listingID].creatorWallet == address(0), "Listing ID already exists");
        products[_listingID] = ProductData({
            title: _title,
            description: _description,
            price: _price,
            quantity: _quantity,
            formSelectionType: _formSelectionType,
            image: _image,
            creatorWallet: payable(msg.sender),
            isDelivered: false
        });

        emit ProductListed(_listingID, msg.sender, _price, _quantity);
    }

    // Function for customers to buy products
    function purchaseProduct(string memory _listingID, uint32 _quantity) public payable {
        ProductData storage product = products[_listingID];
        require(_quantity <= product.quantity, "Not enough items in stock");
        require(msg.value == product.price * _quantity, "Incorrect amount of Ether sent");
        product.quantity -= _quantity;

        emit ProductPurchased(_listingID, msg.sender, _quantity);
    }

    // Function for sellers to confirm delivery and receive payment
    function confirmDelivery(string memory _listingID) public {
        ProductData storage product = products[_listingID];
        require(msg.sender == product.creatorWallet, "Only the seller can confirm delivery");
        require(!product.isDelivered, "Product already delivered");

        product.isDelivered = true;
        product.creatorWallet.transfer(address(this).balance);

        emit DeliveryConfirmed(_listingID, msg.sender);
    }
}
