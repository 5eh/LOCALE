// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

contract CommerceContract {
    address private owner;
    address private deployer;

    mapping(string => ProductData) public products;
    mapping(address => bytes32) private deliveryAddresses;  // Storing hashed delivery addresses

    event ProductListed(string listingID, address owner, uint32 price, uint32 quantity);
    event ProductPurchased(string listingID, address buyer, uint32 quantity);
    event DeliveryConfirmed(string listingID, address owner);
    event DeliveryAddressUpdated(address user, string encryptedAddress);

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

    string private listingTitle;

    constructor() {
        owner = msg.sender;  // Set the contract creator as the owner
        deployer = msg.sender;  // Typically the same as owner, can be set to a different address if needed
    }

    modifier onlyOwnerOrDeployer() {
        require(msg.sender == owner || msg.sender == deployer, "Not authorized");
        _;
    }

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
        listingTitle = _title;  // Set the listing title to the title of the newly created product
        emit ProductListed(_listingID, msg.sender, _price, _quantity);
    }

    function purchaseProduct(string memory _listingID, uint32 _quantity) public payable {
        ProductData storage product = products[_listingID];
        require(_quantity <= product.quantity, "Not enough items in stock");
        require(msg.value == product.price * _quantity, "Incorrect amount of Ether sent");
        product.quantity -= _quantity;

        emit ProductPurchased(_listingID, msg.sender, _quantity);
    }

    function confirmDelivery(string memory _listingID) public {
        ProductData storage product = products[_listingID];
        require(msg.sender == product.creatorWallet, "Only the seller can confirm delivery");
        require(!product.isDelivered, "Product already delivered");

        product.isDelivered = true;
        product.creatorWallet.transfer(address(this).balance);

        emit DeliveryConfirmed(_listingID, msg.sender);
    }

    function setDeliveryAddress(string memory _deliveryAddress) public {
        bytes32 hashedAddress = keccak256(abi.encodePacked(_deliveryAddress));
        deliveryAddresses[msg.sender] = hashedAddress;
        emit DeliveryAddressUpdated(msg.sender, "Address updated securely");
    }

    function getDeliveryAddress(address user) public view onlyOwnerOrDeployer returns (string memory) {
        require(deliveryAddresses[user] != 0, "No address set for this user");
        return "Encrypted Address: Only viewable by contract owner or deployer";
    }

    function setListingTitle(string memory _listingTitle) public onlyOwnerOrDeployer {
        listingTitle = _listingTitle;
    }

    function getListingTitle() public view returns (string memory) {
        return listingTitle;
    }

    function getProductData(string memory listingID) public view returns (ProductData memory) {
        require(products[listingID].creatorWallet != address(0), "Product does not exist");
        return products[listingID];
    }
}
