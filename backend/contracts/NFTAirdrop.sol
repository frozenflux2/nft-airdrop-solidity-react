// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error NFTAirdrop__NFTAlreadyMinted(address caller);
error NFTAirdrop__NotInTheAllowlist(address caller);

contract NFTAirdrop is ERC721URIStorage, Ownable {
    // * STATE VARIABLES
    bytes32 public immutable root;
    string[] public nftTokenUris;
    uint256 private tokenCounter;

    // * this mapping will keep track of whether the address minted the NFT or not.
    mapping(address => bool) private addressToNFTMinted;

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

    // * FUNCTIONS
    /**
     * @param _root will be the root hash of the merkle tree.
     * @param _name will be the name of the token.
     * @param _symbol will be the symbol of the token.
     * @param _nftTokenUris will be the token metadata ipfs hashes.
     */
    constructor(
        bytes32 _root,
        string memory _name,
        string memory _symbol,
        string[] memory _nftTokenUris
    ) ERC721(_name, _symbol) {
        root = _root;
        nftTokenUris = _nftTokenUris;
        tokenCounter = 0;
    }

    /**
     * @param _proof will be the hex value of proof with the give caller address generated from the merkle tree.
     */
    function verify(bytes32[] memory _proof) private view returns (bool) {
        return
            MerkleProof.verify(
                _proof,
                root,
                keccak256(abi.encodePacked(msg.sender))
            );
    }

    /**
     * @param _proof will be the hex value of proof with the give caller address generated from the merkle tree.
     * @param _tokenUriIndex will be the index number of NFT Uri select by the user.
     */
    function preMintNFT(
        bytes32[] memory _proof,
        uint8 _tokenUriIndex
    ) external payable {
        // * if address already mintend nft then revert.
        if (addressToNFTMinted[msg.sender]) {
            revert NFTAirdrop__NFTAlreadyMinted(msg.sender);
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

    function getTokenId() external view returns (uint256) {
        return tokenCounter;
    }
}
