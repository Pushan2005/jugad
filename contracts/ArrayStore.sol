// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArrayStore {
    uint[] public numbers;
    
    function store(uint number) public {
        numbers.push(number);
    }

    function get() view public returns(uint[] memory) {
        return numbers;
    }
}