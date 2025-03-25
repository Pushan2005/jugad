// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ArrayStore {
    uint256 private storedValue;

    event ValueChanged(uint256 newValue);
    
    function setValue(uint256 newValue) public {
        storedValue = newValue;
        console.log("Setting value to", newValue);
        emit ValueChanged(newValue);
    }

    function getValue() public view returns (uint256) {
        return storedValue;
    }
}