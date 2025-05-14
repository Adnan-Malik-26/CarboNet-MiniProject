// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("Green Reward", "GREEN") Ownable(initialOwner){
        _mint(msg.sender, 500000 * 10 ** decimals());
    }

    function mintReward(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

