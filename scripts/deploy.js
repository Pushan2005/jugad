const hre = require("hardhat");

async function main() {
    const ArrayStore = await hre.ethers.getContractFactory("ArrayStore");

    const arrayStore = await ArrayStore.deploy();

    await arrayStore.deployed();

    console.log("Wallet deployed to:", arrayStore.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode(1);
});
