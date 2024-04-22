// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.24;

contract DeliveryContract {

    struct PackageInformation {
        string addressA;
        string addressB;
        uint256 compensation;
        string contents;
        string instructions;
        address personC;
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

    event DriverAgreed(address indexed driver);
    event EscrowReleased(address indexed payer, uint256 amount);
    event OrderCreated(uint256 indexed orderIndex, address recipient, uint256 compensation);

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

    // Create a new request for delivery
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

    // Driver agrees to handle the transaction
    function agreeToTransaction() public {
        // GitCoin.Initiation(user.Testation) Minimum requirement here. 
        
        require(driver == address(0), "Driver already set.");
        require(msg.sender != originalDeployer, "Deployer cannot be driver.");
        
        driver = msg.sender;
        emit DriverAgreed(driver);
    }

    // Release the escrow to the driver
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