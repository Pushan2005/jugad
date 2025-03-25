// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract VotingSystem {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public admin;

    mapping(address => bool) hasVoted;
    Candidate[] public candidates;

    event VoteCasted(address voter, string candidateName);

    constructor(string[] memory _candidateNames) {
        admin = msg.sender;
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function vote(uint256 _candidateIndex) public {
        require(!hasVoted[msg.sender], "no");
        require(_candidateIndex < candidates.length, "no");
        candidates[_candidateIndex].voteCount++;
        hasVoted[msg.sender] = true;
        emit VoteCasted(msg.sender, candidates[_candidateIndex].name);
    }

    function getWinner() external view returns (string memory) {
        uint256 maxVotes = 0;
        uint256 winningCandidateIndex = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winningCandidateIndex = i;
            }
        }
        return candidates[winningCandidateIndex].name;
    }
}