const { expect } = require("chai");
const { ethers } = require("hardhat");

console.log("Executing test file");

describe("ArrayStore", () => {
    console.log("Test file is being executed!");

    let Storage, storage;

    beforeEach(async function () {
        console.log("Test file is being executed!");

        ArrayStore = await ethers.getContractFactory("ArrayStore");
        arrayStore = await ArrayStore.deploy();
        await arrayStore.deployed();

        console.log("ArrayStore deployed to:", arrayStore.address);
    });

    it("Should store a value correctly", async () => {
        const value = 42;
        const tx = await storage.setValue(value);
        await tx.wait();

        const storedValue = await storage.getValue(); 
        expect(storedValue.toNumber()).to.equal(value);
    });
});
