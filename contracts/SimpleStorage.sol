// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    string public storedData;

    function set(string memory x) public {
        storedData = x;
    }

    function get() public view returns (string memory) {
        return storedData;
    }
}