// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTAirdrop is ERC721URIStorage, Ownable {
    bytes32 private immutable root;
    string private nftTokenUri;
    uint256 private immutable mintFee;
    uint256 private tokenCounter;

    constructor(
        bytes32 _root,
        string memory _name,
        string memory _symbol,
        string memory _nftTokenUri,
        uint256 _mintFee
    ) ERC721(_name, _symbol) {
        root = _root;
        nftTokenUri = _nftTokenUri;
        mintFee = _mintFee;
        tokenCounter = 0;
    }

    function verify(bytes32[] memory _proof) public view returns (bool) {
        return
            MerkleProof.verify(
                _proof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            );
    }
}
