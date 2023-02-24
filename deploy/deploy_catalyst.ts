import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy("Catalyst", {
    from: deployer,
    log: true,
    proxy: {
      viaAdminContract: {
        name: "ProxyAdmin",
        artifact: "ProxyAdmin",
      },
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          // TODO replace with actual data
          args: ["https://somebaseurl.com/{id}", deployer],
        },
      },
      upgradeIndex: 0,
    },
    skipIfAlreadyDeployed: true,
  });
};
export default func;
func.tags = ["Catalyst"];
func.dependencies = ["ProxyAdmin"];
