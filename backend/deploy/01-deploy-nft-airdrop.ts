import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat-config";
import { network } from "hardhat";
import verify from "../utils/verify";
import { generateMerkleTree } from "../scripts/generate-merkle-tree";
import MerkleTree from "merkletreejs";

// * specify the addresses in the allowlist.
const allowList = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x0000000000000000000000000000000000000002",
    "0x0000000000000000000000000000000000000003",
    "0x0000000000000000000000000000000000000004",
    "0x0000000000000000000000000000000000000005",
    "0x0000000000000000000000000000000000000006",
];

// * specify the nft metadata uris ipfs hashes.
const metadataIpfsHashes: string[] = [];

const deployNFTAirdrop: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { deploy } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    const chainId = network.config.chainId!;

    const tree: MerkleTree = await generateMerkleTree(allowList);
    const root = tree.getHexRoot();

    if (metadataIpfsHashes.length <= 0) {
        throw "Specify the hashes of the metadata files.";
    }

    const nftUris = metadataIpfsHashes.map((hash) => `ipfs://${hash}`);
    const nftName: string = "Digital Critters Collection";
    const nftSymbol: string = "DCC";

    const args = [root, nftName, nftSymbol, nftUris];

    const nftAirdrop: DeployResult = await deploy("NFTAirdrop", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: developmentChains.includes(network.name) ? 1 : 6,
    });

    // * only verify on testnets or mainnets.
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(nftAirdrop.address, args);
    }
};

export default deployNFTAirdrop;
deployNFTAirdrop.tags = ["all", "nftAirdrop"];
