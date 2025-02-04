const hre = require("hardhat");

async function main() {
    const EtherWallet = await hre.ethers.getContractFactory("EtherWallet");

    const etherWallet = await EtherWallet.deploy();

    await etherWallet.deployed();

    console.log("Wallet deployed to:", etherWallet.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode(1);
});
