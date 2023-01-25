import { MerkleTree } from "merkletreejs";
import { keccak256 } from "ethers/lib/utils";

const allowList = [
    "0x1eF4C1db7c299c9B5248dA1FF8E4805fD6F4D4D1",
    "0xd34800bdFeb643D101DD05e12fCadfaA9A1Cc895",
    "0x692C992aE1323F1d15719BB9d7AFaE6f1369b135",
    "0xdfCb787Ef81c5Af85b686a9C683A760c31Cad1cB",
    "0xbcFA8eAB1fCe576F1Ef71772E46519e0ADC06623",
    "0xfFf11ab3aF15a4D18091c27Aed37e42EEA8d2345",
    "0xd7A268E4C13487A15a5ded637B3e9FD6b9F81e99",
    "0xf01726E8820456F2005b8D5d57f757b6F527a6C7",
    "0xC5cF4f7ed3C4899F867125CAA050e8e5f90479a1",
    "0x76399c8A5027fD58A1D1b07500ccC8a223BEE0c3",
    "0x691E15d7111b1940Bba24733D0FBE99261f4e846",
];

// const allowList = [
//     "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//     "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
//     "0x0000000000000000000000000000000000000003",
//     "0x0000000000000000000000000000000000000004",
//     "0x0000000000000000000000000000000000000005",
//     "0x0000000000000000000000000000000000000006",
// ];

export async function generateMerkleTree(): Promise<MerkleTree> {
    const leaves = allowList.map((address) => keccak256(address));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

    const root = tree.getHexRoot();
    // console.log(`Merkle Root: `, root);
    // console.log(`Merkle Tree:\n`, tree.toString());

    return tree;
}
