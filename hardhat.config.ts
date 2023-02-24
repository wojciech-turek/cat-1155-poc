import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    upgradeAdmin: {
      default: 1,
    },
  },
  networks: {
    goerli: {
      url: "https://endpoints.omniatech.io/v1/eth/goerli/public",
      accounts: [process.env.DEPLOYER_PK!],
      verify: {
        etherscan: {
          apiKey: process.env.ETHERSCAN_API_KEY,
        },
      },
    },
  },
};

export default config;
