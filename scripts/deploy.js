const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const BulkNFT = await hre.ethers.getContractFactory("BulkNFT");

  // Define constructor arguments
  const name = "My Bulk NFT";
  const symbol = "BULK";
  const baseTokenURI = "https://nftstorage.link/ipfs/bafybeib7j7kxkd5u445oewlttohocyc55t6pjmxyyxwtwp65o4zpbwyxhe/";

  // Deploy the contract
  const bulkNFT = await BulkNFT.deploy(name, symbol, baseTokenURI);

  // Wait for the contract to be deployed
  await bulkNFT.deployed();

  console.log("BulkNFT deployed to:", bulkNFT.address);
}

// Run the deployment
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
