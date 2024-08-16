/** @type import('hardhat/config').HardhatUserConfig */
const path = require("path");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: path.join(__dirname, "/.env") });
require("hardhat-gas-reporter");

module.exports = {
  solidity: "0.8.0",
  paths: {
    sources: "./contracts",
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 11155111,
      gasPrice: 20000000000,
    },
    polygonAmoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || "",
    // apiKey: {
    //   polygonAmoy: process.env.POLYGONSCAN_API_KEY || "",
    // },
    // customChains: [
    //   {
    //     network: "polygonAmoy",
    //     chainId: 80002,
    //     urls: {
    //       apiURL: "https://api-amoy.polygonscan.com/api",
    //       browserURL: "https://amoy.polygonscan.com",
    //     },
    //   },
    // ],
  },
};
