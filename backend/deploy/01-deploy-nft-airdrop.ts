import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat-config";
import { network } from "hardhat";
import verify from "../utils/verify";

const deployNFTAirdrop: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {};

export default deployNFTAirdrop;
deployNFTAirdrop.tags = ["all", "nftAirdrop"];
