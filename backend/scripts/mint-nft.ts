import { ethers, getNamedAccounts } from "hardhat";
import { BigNumber, ContractTransaction } from "ethers";
import { NFTAirdrop } from "../typechain-types";
import { generateMerkleTree } from "./generate-merkle-tree";
import MerkleTree from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";

const NFT_INDEX = 0;

async function mintNftAirdrop(): Promise<void> {
    const { deployer } = await getNamedAccounts();

    const nftAirdrop: NFTAirdrop = await ethers.getContract(
        "NFTAirdrop",
        deployer
    );

    console.log(`NFTAirdrop contract addresss: ${nftAirdrop.address}`);

    // * get the nft token id.
    const tokenId = await nftAirdrop.getTokenId();

    // * get the merkle tree generated with list of allowed addresses.
    const tree: MerkleTree = await generateMerkleTree();

    // * convert the deployer address to kaccak256 hash address.
    const hashAddress = keccak256(deployer);

    console.log(`Looking for: ${deployer} => ${hashAddress}`);

    // * give the hash address of deployer to getHexProof function of merkle tree.
    const proof = tree.getHexProof(hashAddress);

    // * pass the proof to preMintNFT function with selected NFT Index.
    const tx: ContractTransaction = await nftAirdrop.preMintNFT(
        proof,
        NFT_INDEX
    );
    await tx.wait(1);

    console.log(
        `NFT minted successfully. You can view the NFT of Opensea testnet: https://testnets.opensea.io/assets/goerli/${nftAirdrop.address}/${tokenId}`
    );
}

mintNftAirdrop()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
