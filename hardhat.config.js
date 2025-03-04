/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

SEPOLIA_URL = process.env.SEPOLIA_URL;
PRIVATE_KEY = process.env.PRIVATE_KEY;

task(
    "accounts-with-balance",
    "Prints the list of accounts with their balances"
).setAction(async () => {
    const accounts = await ethers.getSigners();
    for (const account of accounts) {
        const balance = await account.getBalance();
        const testVar = ethers.utils.formatEther(balance);
        if (testVar > 0) {
            console.log(
                `${account.address} has ${ethers.utils.formatEther(
                    balance
                )} ETH`
            );
        }
    }
});

task("test-task", "A test task").setAction(async () => {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const arrayStore = await hre.ethers.getContractAt(
        "ArrayStore",
        contractAddress
    );
    const storeTx = await arrayStore.store(21);
    await storeTx.wait();
    console.log("Stored 21 in the contract");

    const storeTx2 = await arrayStore.store(42);
    await storeTx2.wait();
    console.log("Stored 42 in the contract");

    const retrieveTx = await arrayStore.get();

    console.log("Retrieved from the contract: ", retrieveTx);
});

task("delpoycontract", "Deploy a new instance of the contract")
    .addParam("name", "The name of the contract")
    .setAction(async (taskArgs, hre) => {
        const Example = await hre.ethers.getContractFactory(taskArgs.name);
        const example = await Example.deploy();
        await example.deployed();
        console.log("Contract address: ", example.address);
    });

module.exports = {
    solidity: "0.8.28",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        sepolia: {
            url: SEPOLIA_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
};
