// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.17;

/**
 * @title DeliveryContract
 * @notice Contract to manage a single delivery transaction and associated escrow functionality for Locale.
 * @dev Instantiate once per (from, to) delivery.
 */
contract DeliveryContract {

    struct PackageInformation {
        string addressA;
        string addressB;
        uint256 compensation;
        string contents;
        string instructions;
        address personC;            // Force release user (admin) in case of disputes
    }
    
    struct Order {
        bytes deliveryData;     
        address recipient;
        uint256 compensation;
        bool isPaid;
    }

    PackageInformation public packageInfo;
    address public driver;
    address public originalDeployer;
    bool public isDriverPaid = false;
    
    Order[] public orders;

    /**
     * @notice Emitted when a driver agrees to handle the transaction.
     * @dev Only address is emitted, other info is ikely to be reasonably ephemeral and so can be pruned or obtained from archive nodes.
     * @param driver Driver's ETH address.
     */
    event DriverAgreed(address indexed driver);

    /**
     * @notice Emitted when escrow is released to the driver.
     * @param payer Address of (usually recipient) who released the escrow.
     * @param amount Amount.
 */
    event EscrowReleased(address indexed payer, uint256 amount);

    /**
     * @notice Emitted when a new order is created.
     * @param orderIndex Order index.
     * @param recipient Recipient ETH address.
     * @param compensation Driver's compensation amount.
     */
    event OrderCreated(uint256 indexed orderIndex, address recipient, uint256 compensation);

    /**
     * @dev Constructor for initializing package information and escrow.
     * @param _addressA Sender ETH address.
     * @param _addressB Recipient ETH address.
     * @param _compensation Driver compensation amount.
     * @param _contents Contents of the package.
     * @param _instructions Delivery instructions.
     * @param _personC Third party involved in the transaction.
     */
    constructor(
        string memory _addressA,
        string memory _addressB,
        uint256 _compensation,
        string memory _contents,
        string memory _instructions,
        address _personC
    ) payable {
        require(msg.value == _compensation, "Compensation amount must match sent value.");
        
        packageInfo = PackageInformation(_addressA, _addressB, _compensation, _contents, _instructions, _personC);
        originalDeployer = msg.sender;
    }

    /**
     * @dev Create a new request for delivery.
     * @param deliveryData Data related to the delivery, including physical delivery instructions.
     * @param recipient Recipient ETH address.
     */
     function createRequest(bytes calldata deliveryData, address recipient) public payable {
        uint256 compensation = msg.value;
        Order memory newOrder = Order(deliveryData, recipient, compensation, false);
        orders.push(newOrder);
        emit OrderCreated(orders.length - 1, recipient, compensation);
    }

    // Stub for handling payout (to be implemented)
    function handlePayout(uint256 orderIndex) public {
        // Placeholder code
    }

    // Stub for verifying delivery (to be implemented)
    function verifyDelivery(uint256 orderIndex) public {
        // Placeholder code
    }

    /**
     * @notice Driver agrees to handle the transaction.
     * @dev Must not already be agreed by another driver!
     */
    function agreeToTransaction() public {
        // GitCoin.Initiation(user.Testation) Minimum requirement here. 
        
        require(driver == address(0), "Driver already set.");
        require(msg.sender != originalDeployer, "Deployer cannot be driver.");
        
        driver = msg.sender;
        emit DriverAgreed(driver);
    }


    /**
     * @notice Release the escrow to the driver.
     * @dev Can be called by either recipient or, in case of dispute by a pre-specified admin user
     */
    function releaseEscrowToDriver() public {
        require(msg.sender == originalDeployer || msg.sender == packageInfo.personC, "Unauthorized.");
        require(driver != address(0), "Driver not set.");
        require(!isDriverPaid, "Driver already paid.");
        
        isDriverPaid = true;
        
        // Send the compensation from escrow to driver
        payable(driver).transfer(packageInfo.compensation);
        
        emit EscrowReleased(msg.sender, packageInfo.compensation);
    }

}