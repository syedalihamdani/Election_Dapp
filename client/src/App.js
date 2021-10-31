import React, {useState } from 'react';
import './App.css';
import getWeb3 from './getWeb3';
import Election from './artifacts/Election.json';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  const [web3,setweb3]=useState();
  const [account,setaccount]=useState();
  const [contract,setcontract]=useState();
  const [networkName,setnetworkName]=useState("Wallet not");
  const [Balance,setBalance]=useState();
  const [Candidateid,setCandidateid]=useState();
  const [Candidateid2,setCandidateid2]=useState();
  const [Voteraddress,setVoteraddress]=useState('hh');
  const [Votecount,setVotecount]=useState();
  const [Votecount2,setVotecount2]=useState();
  const [View,setView]=useState();
  const [Isvoted,setIsvoted]=useState();
  const [Count,setCount]=useState();
  const [Event,setEvent]=useState();
 const connect = async () => {
      const Web3 = await getWeb3();
      setweb3(Web3);
      const accounts = await Web3.eth.getAccounts();
      setaccount(accounts[0]);
      const balance = await Web3.eth.getBalance(accounts[0]);
      const balance2=(Web3.utils.fromWei(balance,'ether'));
      // console.log(balance2);
      setBalance(balance2);
       const networkId = await Web3.eth.net.getId();
       if(networkId===1){
        setnetworkName("Mainnet")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===3){
        setnetworkName("Ropsten")
        
      }else if(networkId===42){
        setnetworkName("Kovan")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===4){
        setnetworkName("Rinkeby")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===5){
        setnetworkName("Goerli")
        alert("Connect to Ropsten network otherwise it won't work")
      }else if(networkId===5777){
        setnetworkName("Ganache")
        alert("Connect to Ropsten network otherwise it won't work")
      }else{
        setnetworkName("Undefined")
        alert("Connect to Ropsten network otherwise it won't work")
      }
       const deployedNetwork = Election.networks[networkId];
       const instance = new Web3.eth.Contract(
         Election.abi,
         deployedNetwork && deployedNetwork.address);
         setcontract(instance);
 }
connect();
const candidateId=(event)=>{
  setCandidateid2(event.target.value);
}
const votefor= async()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
    await contract.methods.vote(Candidateid2).send({from:account});
    // await contract.getPastEvents('electionupdate',{fromBlock:0},(err,result)=>(alert(` Vote nomber ${result.length} is casted `)));
    await contract.getPastEvents('electionupdate',{fromBlock:0},(err,result)=>(alert(` Vote nomber ${result.length} is casted `)));
  }
}
const candidatesCount=async()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
  await contract.methods.candidatesCount().call((err,result)=>{setCount(result)});
  }

}
const candidatesno=(event)=>{
  setCandidateid(event.target.value);
}
const candidatesdata=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else{
  await contract.methods.candidates(1).call((err,result)=>{setVotecount(result.votecount)});
  await contract.methods.candidates(2).call((err,result)=>{setVotecount2(result.votecount)});
  }
}
// setInterval(()=>candidatesdata(),120000)
const voteraddress=(event)=>{
  setVoteraddress(event.target.value);
}
const isvoted=async ()=>{
  if(networkName!=="Ropsten"){
    alert("Connect to Ropsten network otherwise it won't work")
  }else if(Voteraddress.length!==42){
    alert("Enter the correct ropsten account address to see the balance.copy the address from your wallet")
  }else{
    await contract.methods.votedornot(Voteraddress).call((err,result)=>{setIsvoted(result.toString())});
  }

}
const restart=()=>{
 window.location.reload(false);
}
  return (
    <>
  <div className="page">  
  <nav className="navbar">
  <div className="upper">
      <h4>{networkName} Connected</h4>
      <h4>Balance: {Balance}</h4>
      <button className="btn" onClick={restart}><h4>Connect to Wallet</h4></button></div>
  <div className="lower">Account:{account}</div>
  </nav>
  <div className="result">
    <div className="collection">
      <h3>id</h3>
      <h3>Name</h3>
      <h3>Votes</h3>
    </div>
    <div className="collection">
    <h3>1</h3>
      <h3>Donald Trump</h3>
      <h3>{Votecount}</h3>
    </div>
    <div className="collection">
    <h3>2</h3>
      <h3>Bark Obma</h3>
      <h3>{Votecount2}</h3>
    </div>
  </div>
  <div className="Main">
  <div className="section">
  {/* <div className="screen">{View}</div> */}
  {/* <input className="input" placeholder="Id of Candidate" type="number" onChange={candidatesno}></input> */}
      <button className="btn2" onClick={()=>candidatesdata()}>Up date Result</button>
  </div>
  <div className="section">
  <div className="screen">{Count}</div>
      <button className="btn2" onClick={()=>candidatesCount()}>Number of candidates</button>
  </div>
  <div className="section">
  <div className="screen">{Isvoted}</div>
  <input className="input" placeholder="Voter address" type="string" maxLength="42" onChange={voteraddress}></input>
      <button className="btn2" onClick={()=>isvoted()}>Is voted?</button>
  </div>
  <div className="section">
  <input className="input" placeholder="Id of Candidate" type="number" min="1" max="2" onChange={candidateId}></input>
      <button className="btn2" onClick={()=>votefor()}>Vote</button>
  </div>
  </div>
  </div>
    </>
  )
}
export default App;
