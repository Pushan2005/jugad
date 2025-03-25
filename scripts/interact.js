const hre = require("hardhat");

async function main() {
    try {
        const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
        const arrayStore = await hre.ethers.getContractAt(
            "ArrayStore",
            contractAddress
        );
        const storeTx = await arrayStore.setValue(21);
        await storeTx.wait();
        const getValueTx = await arrayStore.getValue();
        console.log("Retrieved from the contract: ", getValueTx);
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
