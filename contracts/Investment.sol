// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Investment {
    address public owner;
    uint256 public totalInvested;

    struct Investor {
        uint256 amountInvested;
        uint256 timestamp;
    }

    mapping(address => Investor) public investors;
    address[] public investorAddresses;

    event InvestmentMade(address indexed investor, uint256 amount, uint256 timestamp);
    event ReturnsDistributed(uint256 totalAmount, uint256 timestamp);

    // Reentrancy Guard state
    bool private locked;

    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function invest() external payable nonReentrant {
        require(msg.value > 0, "Investment amount must be greater than 0");

        if (investors[msg.sender].amountInvested == 0) {
            investorAddresses.push(msg.sender);
        }

        investors[msg.sender].amountInvested += msg.value;
        investors[msg.sender].timestamp = block.timestamp;
        
        totalInvested += msg.value;

        emit InvestmentMade(msg.sender, msg.value, block.timestamp);
    }

    function distributeReturns() external payable onlyOwner {
        require(msg.value > 0, "Distribution amount must be greater than 0");
        require(totalInvested > 0, "No investments yet");

        uint256 distributionAmount = msg.value;

        for (uint256 i = 0; i < investorAddresses.length; i++) {
            address investorAddr = investorAddresses[i];
            uint256 share = (investors[investorAddr].amountInvested * distributionAmount) / totalInvested;
            
            // Transfer share to investor
            (bool success, ) = payable(investorAddr).call{value: share}("");
            require(success, "Transfer failed");
        }

        emit ReturnsDistributed(distributionAmount, block.timestamp);
    }

    function getInvestorCount() external view returns (uint256) {
        return investorAddresses.length;
    }

    function getTotalInvested() external view returns (uint256) {
        return totalInvested;
    }
}
