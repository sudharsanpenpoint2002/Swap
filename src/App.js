// Importing modules
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Token1,abi1,Token2,abi2,Token3,abi3,Swapaddress,abi4} from "./abi";
import web3 from "./web3";
import {useRef} from "react";


function App() {

// usetstate for storing and retrieving wallet details
const [data, setdata] = useState({
	address: "",
	Balance: null,
});

const[amount,setAmount]=useState("");
const[amount1,setAmount1]=useState("");
const inputamt=useRef(null);
const inputamt1=useRef(null);
const inputamt2=useRef(null);
const inputamt3=useRef(null);
const inputamt4=useRef(null);
const inputamt5=useRef(null);

const erc20contract1 = new web3.eth.Contract(abi1, Token1);
const erc20contract2 = new web3.eth.Contract(abi2, Token2);
const erc20contract3 = new web3.eth.Contract(abi3, Token3);

const swapcontract = new web3.eth.Contract(abi4, Swapaddress);




// Button handler button for handling a
// request event for metamask
const btnhandler = () => {

	// Asking if metamask is already present or not
	if (window.ethereum) {

	// res[0] for fetching a first wallet
	window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => accountChangeHandler(res[0]));
	} else {
	alert("install metamask extension!!");
	}
};

// getbalance function for getting a balance in
// a right format with help of ethers
const getbalance = (address) => {

	// Requesting balance method
	window.ethereum
	.request({
		method: "eth_getBalance",
		params: [address, "latest"]
	})
	.then((balance) => {
		// Setting balance
		setdata({
		Balance: ethers.utils.formatEther(balance),
		});
	});
};

// Function for getting handling all events
const accountChangeHandler = (account) => {
	// Setting an address data
	setdata({
	address: account,
	});

	// Setting a balance
	getbalance(account);
};
	 

const invest_tok = async(val1,val2)=>{
    console.log("Transfering....",val1);
	
    const accounts = await  web3.eth.getAccounts();
	await swapcontract.methods.invest(web3.utils.toBN(val1*1000000000000000000),val2).send({from:accounts[0]});
    
    
  }
  function handle() {
    console.log(inputamt.current.value);
	console.log(inputamt1.current.value);
	
    let f=inputamt.current.value;
	let x=inputamt1.current.value;
	
    setAmount(f*1000000000000000000);
    invest_tok(f,x);
  }

const Swap_for_tok = async(val3,val4,val5)=>{
    console.log("Transfering....");
	
    const accounts = await  web3.eth.getAccounts();
	if(val4 == 1){
		await swapcontract.methods.Swap_token1(web3.utils.toBN(val3*1000000000000000000),val5).send({from:accounts[0]});
	}
	else if(val4 == 2){
		await swapcontract.methods.Swap_token2(web3.utils.toBN(val3*1000000000000000000),val5).send({from:accounts[0]});
	}
	else if(val4 == 3){
		await swapcontract.methods.Swap_token3(web3.utils.toBN(val3*1000000000000000000),val5).send({from:accounts[0]});
	}
    console.log("token not recognised");
    // setAmount3(await fraxcontract.methods.collatamt(accounts[0]).call());
  }
  
 
  function handle1() {
    console.log(inputamt2.current.value);
	console.log(inputamt3.current.value);
	console.log(inputamt4.current.value);
	
    let u=inputamt2.current.value;
	let v=inputamt3.current.value;
	let w=inputamt4.current.value;
	
    setAmount1(u*1000000000000000000);
    Swap_for_tok(u,v,w);
  }


  
         const approve = async()=>{
			const accounts = await  web3.eth.getAccounts();
			await erc20contract1.methods.approve("0xB3B0e64fA994e00c32e69AFb164c80E3dA24004a",web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			await erc20contract2.methods.approve("0xB3B0e64fA994e00c32e69AFb164c80E3dA24004a",web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			await erc20contract3.methods.approve("0xB3B0e64fA994e00c32e69AFb164c80E3dA24004a",web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			await erc20contract1.methods.approve(accounts[0],web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			await erc20contract2.methods.approve(accounts[0],web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			await erc20contract3.methods.approve(accounts[0],web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			console.log("approved");
		}

		const approve_user = async(val6)=>{
			const accounts = await  web3.eth.getAccounts();
			await erc20contract1.methods.approve(`${val6}`,web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			await erc20contract2.methods.approve(`${val6}`,web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			await erc20contract3.methods.approve(`${val6}`,web3.utils.toBN(100000000000000000000)).send({from:accounts[0]});
			console.log("approve finished");
		}
		function handle2() {
			console.log(inputamt5.current.value);
			
			let y=inputamt5.current.value;
			approve_user(y);
		  }

		const mint_tok1 = async()=>{
			const accounts = await  web3.eth.getAccounts();
			await erc20contract1.methods.mint(web3.utils.toBN(10000000000000000000)).send({from:accounts[0]});
		}

		const mint_tok2 = async()=>{
			const accounts = await  web3.eth.getAccounts();
			await erc20contract2.methods.mint(web3.utils.toBN(10000000000000000000)).send({from:accounts[0]});
		}

		const mint_tok3 = async()=>{
			const accounts = await  web3.eth.getAccounts();
			await erc20contract3.methods.mint(web3.utils.toBN(10000000000000000000)).send({from:accounts[0]});
		}

	  
		  
	

return (
	<div className="App">
	{/* Calling all values which we
	have stored in usestate */}

	<Card className="text-center">
		<Card.Header>
		<strong>Address: </strong>
		{data.address}
		</Card.Header>
		<Card.Body>
		<Card.Text>
			<strong>Balance: </strong>
			{data.Balance}
		</Card.Text>
		<Button onClick={btnhandler} variant="primary">
			Connect to wallet
		</Button>
		
		
		
		<br/>
		<br/>
		<Button onClick={approve} >
		approve
		</Button><br/><br/>

        <h2>Approve User</h2>
		<br/>
		<label>Address</label>&nbsp;&nbsp;<input ref={inputamt5}
        type="text"
        id="amt"
        name="amt"/>&nbsp;&nbsp;
		<Button onClick={handle2} >
		approve user
		</Button><br/><br/>

        <h2>Faucet</h2>
		<Button onClick={mint_tok1} >Mint Token1</Button>&nbsp;&nbsp;
		<Button onClick={mint_tok2} >Mint Token2</Button>&nbsp;&nbsp;
		<Button onClick={mint_tok3} >Mint Token3</Button><br/><br/>

		<h2>Invest Amount</h2>
		<br/>
		<label>Amount</label>&nbsp;&nbsp;<input ref={inputamt}
        type="text1"
        id="amt1"
        name="amt1"/>&nbsp;&nbsp;
		<label>Token</label>&nbsp;&nbsp;<input ref={inputamt1}
        type="text2"
        id="amt2"
        name="amt2"/>&nbsp;&nbsp;
       <Button onClick={handle}>Invest</Button>
       <p>{amount}</p><br/><br/>
		
	
	    <h2>Swap Tokens</h2>
		<br/>
		<label>Amount</label>&nbsp;&nbsp;<input ref={inputamt2}
        type="text3"
        id="amt3"
        name="amt3"/>&nbsp;&nbsp;
		<label>Token to swap</label>&nbsp;&nbsp;<input ref={inputamt3}
        type="text4"
        id="amt4"
        name="amt4"/>&nbsp;&nbsp;
		<label>Token needed</label>&nbsp;&nbsp;<input ref={inputamt4}
        type="text5"
        id="amt5"
        name="amt5"/>&nbsp;&nbsp;
     <Button onClick={handle1}>Swap</Button>	
	 <p>{amount1}</p>
	 <br/>
	 <br/>

	 <h2>Guide</h2>
          <p>Addresses 
             <br/>Token1 = 0xBEdd216cb7437ac8E7cd12eA2B2EDA3662C978dE 
             <br/>Token2 = 0x18bAcD00711373C7C38809854Af1fef24F6f2E98 
             <br/>Token3 = 0x2AE78965711F9dc6F2c72a3f86E5a4cb9F09c544

             <br/>SwapContract = 0xB3B0e64fA994e00c32e69AFb164c80E3dA24004a <br/>

*****NOTE Before using this project users are requested to impoert the above mentioned tokens in thier wallets*****</p><br/><br/>
	 <p>In this project every token is refered using numbers
		
			<br/>Token1 =  1
			<br/>Token2 =  2
			<br/>Token3 =  3
		
		<br/><br/><br/>
		By clicking <strong>Approve</strong> button we can get 6 approvals for both contract and current user 
		from 3 <strong>ERC20</strong> token contracts
		<br/>
		******NOTE: Wait until 6 approvals are finished*******
		<br/><br/><br/>
		<strong>Approve User</strong> section is for convinence sake. Using it ERC20 contract owner can give 
		approval for other users.
		
		<br/>Address = Adress of another user who needs approval from ERC20 contract owner
		
		<br/>
		******NOTE: Wait until 3 approvals are finished*******
		<br/><br/><br/>
		<strong>Invest Amount</strong> section is used to feed the Swap contracts Liquidity pool with Tokens
		<br/>
		
		<br/>Amount = no of tokens user wish to invest
		<br/>Token = Token user wish to invest (1 or 2 or 3) 
		
		
		<br/><br/><br/>
		<strong>Swap Tokens</strong> section is used to Swap tokens
		<br/>
		
		<br/>Amount = no of tokens user wish to <strong>Swap</strong>
		<br/>Token to swap = Token that user wish to give to contract (1 or 2 or 3)
		<br/>Token needed = Token that user wish to get from contract (1 or 2 ) <br/>
			
		
		if <strong>Token to swap = 1</strong> and <strong>Token needed = 1</strong> means user gets <strong>Token2</strong> <br/>
		if <strong>Token to swap = 1</strong> and <strong>Token needed = 2</strong> means user gets <strong>Token3</strong> <br/>
        if <strong>Token to swap = 2</strong> and <strong>Token needed = 1</strong> means user gets <strong>Token1</strong> <br/>
        if <strong>Token to swap = 2</strong> and <strong>Token needed = 2</strong> means user gets <strong>Token3</strong> <br/>
        if <strong>Token to swap = 3</strong> and <strong>Token needed = 1</strong> means user gets <strong>Token1</strong> <br/>
        if <strong>Token to swap = 3</strong> and <strong>Token needed = 2</strong> means user gets <strong>Token2</strong> <br/>


	 </p>


		
		</Card.Body>
	</Card>
	</div>
);

}
export default App;

