// SPDX-License-Identifier: AFL-1.1

pragma solidity ^0.8.0;

contract SWU_volting {

    constructor() {
        owner = msg.sender;
    }

    address public owner;
    struct commentbox {
        string eachcomment;
    }
    string[] public candidatelist;
    mapping(address=>uint256) public isvoted;
    mapping(string=>uint256) public votereceive;
    mapping(string=>commentbox[]) public commentreceive;

    function addcandidate(string memory candidate) public {
        require(msg.sender == owner, "only owner can add candidate");
        candidatelist.push(candidate);
    }

    function votecandidate(string memory candidate) public {
        require(isvoted[msg.sender] == 0, "you have been voted");
        votereceive[candidate] +=1;
        isvoted[msg.sender] = 1;
    }

    function commentcandidate(string memory candidate,string memory comment) public {
        commentbox memory currentcomment;
        currentcomment.eachcomment = comment;
        commentreceive[candidate].push(currentcomment);
    }

    function returnarray() public view returns(string[] memory){
        return candidatelist;
    }
}