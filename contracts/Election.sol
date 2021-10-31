// SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
contract Election{
    // struct candiate
    // mapping candiate
    // constructor
    struct Candidate{
        uint id;
        string name;
        uint votecount;
    }
    // candiate count
    uint public candidatesCount;
    mapping (uint=>Candidate) public candidates;
    mapping (address=>bool) public votedornot;
    event electionupdate(
        uint id);
    constructor(){
        // The code that we want to initate
        // donal trump & bark obma
        addCandiate("donald trump");
        addCandiate("bark obma");
    }
    // addCandiate
    function addCandiate(string memory name) public{
        candidatesCount++;
        candidates[candidatesCount]=Candidate(candidatesCount,name,0);
    }
    function vote(uint _candidateId) public{
        // The person has not voted again
        require(!votedornot[msg.sender],'You have voted for participant');
        // The id that the person has input is available;
        require(_candidateId>0 &&  _candidateId<=candidatesCount);
        // increase the vote count of the person whom the 
        // candidates[_id].votecount+=1;
        candidates[_candidateId].votecount+=1;
        // bool true;
        votedornot[msg.sender]=true;
        emit electionupdate(_candidateId);
    }
    // function ad(uint _votecount) public returns(uint){
    //     candidates[2].votecount=_votecount;
    //     return candidates[2].votecount;
    // }
    
}