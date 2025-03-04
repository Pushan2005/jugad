const hre = require("hardhat");

async function main() {
    try {
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
    } catch (err) {
        console.log("Error in interact.js: ", err);
        process.exit(1);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
