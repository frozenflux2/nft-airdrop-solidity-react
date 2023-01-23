// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error NFTAirdrop__InsufficientMintFee(uint256 insufficientMintFee);
error NFTAirdrop__NotInTheAllowlist(address caller);
error NFTAirdrop__WithdrawTransactionFailed();

contract NFTAirdrop is ERC721URIStorage, Ownable {
    // * STATE VARIABLES
    bytes32 public immutable root;
    string[] public nftTokenUris;
    uint256 public immutable mintFee;
    uint256 public tokenCounter;

    // * EVENTS
    /**
     * @dev This event will be emitted inside mintNft function.
     * @param owner will be address who call the mintNft function.
     * @param tokenId will be the token id which user will have minted.
     * @param value will be the amount on which NFT will be minted.
     */
    event NFTMinted(
        address indexed owner,
        uint256 indexed tokenId,
        uint256 indexed value
    );

    constructor(
        bytes32 _root,
        string memory _name,
        string memory _symbol,
        string[] memory _nftTokenUris,
        uint256 _mintFee
    ) ERC721(_name, _symbol) {
        root = _root;
        nftTokenUris = _nftTokenUris;
        mintFee = _mintFee;
        tokenCounter = 0;
    }

    function verify(bytes32[] memory _proof) private view returns (bool) {
        return
            MerkleProof.verify(
                _proof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            );
    }

    function preMintNFT(
        bytes32[] memory _proof,
        uint8 _tokenUriIndex
    ) external payable {
        if (msg.value < mintFee) {
            revert NFTAirdrop__InsufficientMintFee(msg.value);
        }

        // * if not in the merkle tree.
        if (!verify(_proof)) {
            revert NFTAirdrop__NotInTheAllowlist(msg.sender);
        }

        uint256 tokenId = tokenCounter;
        tokenCounter = tokenCounter + 1;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, nftTokenUris[_tokenUriIndex]);
        emit NFTMinted(msg.sender, tokenId, msg.value);
    }
}
