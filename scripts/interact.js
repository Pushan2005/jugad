const hre = require("hardhat");

async function main() {
    try {
        const signedAddrs = await hre.ethers.getSigners();
        const owner = signedAddrs[0];
        const addr1 = signedAddrs[1];
        const addr2 = signedAddrs[2];

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const EtherWallet = await hre.ethers.getContractAt(
            "EtherWallet",
            contractAddress
        );

        console.log("Addr1 is depositing 1 ETH...");
        const depositTx = await addr1.sendTransaction({
            to: contractAddress,
            value: hre.ethers.utils.parseEther("1.0"),
        });
        await depositTx.wait();

        const balanceAddr1 = await EtherWallet.balances(addr1.address);
        console.log(
            "Balance of addr1 after depositing: ",
            balanceAddr1.toString()
        );

        console.log("Addr1 is withdrawing 0.5 ETH...");
        const withdrawTx = await EtherWallet.connect(addr1).withdraw(
            hre.ethers.utils.parseEther("0.5")
        );
        await withdrawTx.wait();

        const newBalanceAddr1 = await EtherWallet.balances(addr1.address);
        console.log(
            "Addr1's balance after withdrawal:",
            hre.ethers.utils.formatEther(newBalanceAddr1),
            "ETH"
        );

        console.log("Owner is withdrawing all funds...");
        const withdrawAllTx = await EtherWallet.connect(owner).withdrawAll();
        await withdrawAllTx.wait();

        console.log("All transactions completed!");
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
