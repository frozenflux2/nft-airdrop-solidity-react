import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../../helper-hardhat-config";
import { NFTAirdrop } from "../../typechain-types";
import { generateMerkleTree } from "../../scripts/generate-merkle-tree";
import MerkleTree from "merkletreejs";
import { assert, expect } from "chai";

// * if the newwork will be hardhat or localhost then these tests will be run.
!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFTAirdrop Unit Tests", () => {
          let deployer: string;
          let nftAirdrop: NFTAirdrop;
          let tree: MerkleTree;

          beforeEach(async () => {
              if (!developmentChains.includes(network.name)) {
                  throw "You need to be on a development chain to run tests";
              }
              deployer = (await getNamedAccounts()).deployer;
              await deployments.fixture(["all"]);

              nftAirdrop = await ethers.getContract("NFTAirdrop", deployer);

              tree = await generateMerkleTree();
          });

          describe("getTokenId", () => {
              it("should get the token Id value", async () => {
                  const tokenId = await nftAirdrop.getTokenId();

                  assert(tokenId, "0");
              });
          });
      });
