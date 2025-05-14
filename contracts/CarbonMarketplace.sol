// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./CarbonCreditToken.sol";

contract CarbonMarketplace {
    CarbonCreditToken public token;
    address public owner;
    uint256 public pricePerCredit = 1 ether;

    constructor(address _token) {
        token = CarbonCreditToken(_token);
        owner = msg.sender;
    }

    function buyCredits(uint256 amount) external payable {
        require(msg.value == amount * pricePerCredit, "Incorrect ETH amount");
        token.transfer(msg.sender, amount);
    }

    function sellCredits(uint256 amount) external {
        require(token.balanceOf(msg.sender) >= amount, "Not enough credits");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount * pricePerCredit);
    }

    function withdraw() external {
        require(msg.sender == owner, "Not authorized");
        payable(owner).transfer(address(this).balance);
    }
}

