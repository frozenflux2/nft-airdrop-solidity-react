import { DeployFunction, DeployResult } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains } from "../helper-hardhat-config";
import { network } from "hardhat";
import verify from "../utils/verify";
import { generateMerkleTree } from "../scripts/generate-merkle-tree";
import MerkleTree from "merkletreejs";

// * specify the nft metadata uris ipfs hashes. Read the README.md file to know more about it.
const metadataIpfsHashes: string[] = [];

const deployNFTAirdrop: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { deploy } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    const chainId = network.config.chainId!;

    // * generate the merkle tree of allowlist.
    const tree: MerkleTree = await generateMerkleTree();

    // * get the root of that tree.
    const root = tree.getHexRoot();

    // * if metadata files list is empty then throw error.
    if (metadataIpfsHashes.length <= 0) {
        throw "Specify the hashes of the metadata files.";
    }

    // * prefix the hashes with ipfs.
    const nftUris = metadataIpfsHashes.map((hash) => `ipfs://${hash}`);

    // * specify the name of the NFT Collection.
    const nftName: string = "Digital Critters Collection";

    // * specify the symbol of the NFT Collection.
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
