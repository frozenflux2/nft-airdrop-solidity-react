import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { NFTAirdrop } from "../../typechain-types";
import { generateMerkleTree } from "../../scripts/generate-merkle-tree";
import MerkleTree from "merkletreejs";
import { assert, expect } from "chai";
import { keccak256 } from "ethers/lib/utils";

// * if the newwork will be hardhat or localhost then these tests will be run.
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFTAirdrop Unit Tests", () => {
          let deployer: string;
          let nftAirdrop: NFTAirdrop;
          let tree: MerkleTree;
          const NFT_INDEX = 0;

          beforeEach(async () => {
              if (!developmentChains.includes(network.name)) {
                  throw "You need to be on a development chain to run tests";
              }
              deployer = (await getNamedAccounts()).deployer;
              await deployments.fixture(["all"]);

              nftAirdrop = await ethers.getContract("NFTAirdrop", deployer);

              tree = await generateMerkleTree();
          });

          describe("preMintNFT", () => {
              it("should revert if proof is not valid.", async () => {
                  // * get the signers.
                  const [_, addr2] = await ethers.getSigners();

                  // * convert the address to hash address of kaccek256.
                  const hashAddress = keccak256(addr2.address);

                  // * get the proof of hash address.
                  const proof = tree.getHexProof(hashAddress);

                  await expect(
                      nftAirdrop.connect(addr2).preMintNFT(proof, NFT_INDEX)
                  )
                      .to.be.revertedWithCustomError(
                          nftAirdrop,
                          "NFTAirdrop__NotInTheAllowlist"
                      )
                      .withArgs(addr2.address);
              });
          });

          describe("getTokenId", () => {
              it("should get the token Id value", async () => {
                  const tokenId = await nftAirdrop.getTokenId();

                  assert(tokenId, "0");
              });
          });
      });
