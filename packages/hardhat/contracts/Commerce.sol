// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

/**
 * @title LOCALE
 * @dev A white-label contract to manage commerce functionalities.
 */
contract CommerceContract {
    address private owner;
    address private deployer;

    mapping(string => ProductData) public products;
    mapping(string => address) private productBuyers;  // Track buyers for each product
    mapping(address => string) private deliveryAddresses;  // Storing unhashed delivery addresses
    mapping(address => string) private customInstructions;

    event ProductListed(string listingID, address owner, uint32 price, uint32 quantity);
    event ProductPurchased(string listingID, address buyer, uint32 quantity);
    event DeliveryConfirmed(string listingID, address owner);
    event DeliveryAddressUpdated(address user, string deliveryAddress);
    event CustomInstructionsUpdated(address user, string instructions);

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
        owner = msg.sender;
        deployer = msg.sender;
    }

    modifier onlyOwnerOrDeployer() {
        require(msg.sender == owner || msg.sender == deployer, "Not authorized");
        _;
    }

    /**
     * @dev Create a new product listing.
     * @param _title Listing title.
     * @param _description Product description..
     * @param _price Price.
     * @param _quantity Initial quantity.
     * @param _formSelectionType Type of selection form.****************
     * @param _image Product's image URL.
     * @param _listingID Listing ID.
     */
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

    /**
     * @dev Allows a user to purchase a product.
     * @param _listingID Listing ID.
     * @param _quantity Purchase quantity.
     */
    function purchaseProduct(string memory _listingID, uint32 _quantity) public payable {
        ProductData storage product = products[_listingID];
        require(_quantity <= product.quantity, "Not enough items in stock");
        require(msg.value == product.price * _quantity, "Incorrect amount of Ether sent");
        product.quantity -= _quantity;
        productBuyers[_listingID] = msg.sender; 
        emit ProductPurchased(_listingID, msg.sender, _quantity);
    }

    function confirmDelivery(string memory _listingID) public {
        require(msg.sender == products[_listingID].creatorWallet, "Only the seller can confirm delivery");
        require(!products[_listingID].isDelivered, "Product already delivered");

        products[_listingID].isDelivered = true;
        products[_listingID].creatorWallet.transfer(address(this).balance);

        emit DeliveryConfirmed(_listingID, msg.sender);
    }

    /**
     * @dev Allows a user to set own delivery address against their ETH address.
     * @param _deliveryAddress New delivery address.
     */
    function setDeliveryAddress(string memory _deliveryAddress) public {
        deliveryAddresses[msg.sender] = _deliveryAddress;
        emit DeliveryAddressUpdated(msg.sender, _deliveryAddress);
    }

    /**
     * @dev Retrieves delivery address of a user.
     * @param user User's ETH address.
     * @return Physcial delivery address of the user.
     */
    function getDeliveryAddress(address user) public view returns (string memory) {
        require(bytes(deliveryAddresses[user]).length > 0, "No delivery address set by this user. Are you sure they have purchased?");
        return deliveryAddresses[user];
    }

    /**
     * @dev Allows a user to set custom instructions in addition to own delivery address.
     * @param user User's ETH address.
     * @return Custom instructions of the user.
     */
    function setCustomInstructions(string memory _instructions) public {
        customInstructions[msg.sender] = _instructions;
        emit CustomInstructionsUpdated(msg.sender, _instructions);
    }

    /**
     * @dev Retrieve custom instructions associated with user delivery address, if set.
     * @param user User's ETH address.
     * @return Custom instructions of the user.
     */
    function getCustomInstructions(address user) public view returns (string memory) {
        require(bytes(customInstructions[user]).length > 0, "No custom instructions set for this user. Are you sure they have purchased?");
        return customInstructions[user];
    }

    /**
     * @dev Retrieve the title by ListingID.
     * @return Listing title.
     */
    function getListingTitle() public view returns (string memory) {
        return listingTitle;
    }

    /**
     * @dev Retrieve product data by ListingID.
     * @return Product data.
     */
    function getProductData(string memory listingID) public view returns (ProductData memory) {
        require(products[listingID].creatorWallet != address(0), "Product does not exist");
        return products[listingID];
    }
}
