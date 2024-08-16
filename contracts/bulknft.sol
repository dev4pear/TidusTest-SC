// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BulkNFT is ERC721, Ownable {
    uint256 private constant MAX_TOKENS = 10;
    uint256 private constant MINT_PRICE = 0.0001 ether;
    uint256 private _currentTokenId;
    string private _baseTokenURI;

    // Mapping from owner address to list of owned token IDs
    mapping(address => uint256[]) private _ownedTokens;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseTokenURI
    ) ERC721(name, symbol) {
        _baseTokenURI = baseTokenURI;
        _currentTokenId = 0;
    }

    function mint(address recipient, uint256 amount) public payable {
        require(
            _currentTokenId + amount <= MAX_TOKENS,
            "Exceeds maximum token limit"
        );
        require(msg.value >= MINT_PRICE, "Insufficient balance");

        for (uint256 i = 0; i < amount; i++) {
            _safeMint(recipient, _currentTokenId);
            _ownedTokens[recipient].push(_currentTokenId);
            _currentTokenId++;
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return string(abi.encodePacked(super.tokenURI(tokenId), ".json"));
    }

    function setBaseURI(string memory newBaseURI) public onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    function totalSupply() public view returns (uint256) {
        return _currentTokenId;
    }

    function getOwnedNFTs(
        address owner
    ) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }
}
