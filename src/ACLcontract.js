// Require Web3 Module

//var express = require('express');
//var router = express.Router();
//var ethTx = require('ethereumjs-tx');
const { web3, privateKeys, aclAddress, erc721Address, address, getContract } = require("./utils");
//const axios = require("axios");
//const assert = require("assert");
const {
  getSignedTx,
  //sendSignedTx,
  directSendSignedTx,
} = require("./sendSignTransaction");



/*
var addrACL ='0x446e083592D2dFa6661E20097F6898990C3CACE5';
var addrERC721='0xFa5B6432308d45B54A1CE1373513Fab77166436f';
var addrOwner ='0xf17f52151EbEF6C7334FAD080c5704D77216b732';



// Build a new variable based on the web3 API including the ABI and address of the contract
var ACL = new web3.eth.Contract(abiACL, addrACL);
var ERC721 = new web3.eth.Contract(abiERC721,addrERC721);  */


// test result false / false /false puisque il n existe pas un ressource rsc et cettte adresse .
//ACL.methods.getAclAtb('0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae' , 'voiture').call().then(console.log);


// set d'un nouveau utilisateur dans l'acl 




//get des acl 
//var ins = prompt('entrer un adresse = ');
//var rsc =prompt('entrer un ressource =');
//ACL.methods.getAclAtb(ins, rsc).call().then(console.log);



//set des acls

/*const addr_user= "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
const write = true;
const read = true;
const exec = true;
const res = "voiture"

const from = address[0];
const rawTrans = await getContract().methods.setAclAtb(addr_user, write,read,exec,res);


const signed = await web3.eth.accounts.signTransaction(
    {
      to: aclAddress,
      from: from,
      value: "0",
      data: rawTrans.encodeABI(),
      gasPrice: web3.eth.getGasPrice(), //web3.utils.toWei("20", "gwei"),
      gas: Math.round((await rawTrans.estimateGas({ from })) * 1.5),
      nonce: web3.utils.toHex(
        await web3.eth.getTransactionCount(from, "pending")
      ),
    },
    privateKeys[0]
  );


  await web3.eth.sendSignedTransaction(signed ).on('receipt', receipt => {
    const { transactionHash, status, to, blockNumber } = receipt;
    resp = {
      transactionHash: transactionHash,
      status: status,
      to: to,
      blockNumber: blockNumber
    }
  });


 
  module.exports = {
    sendSignTransaction: sendSignTransaction,
  }; */



(async () => {
  const from =  address[1];
  //const to = "0x446e083592D2dFa6661E20097F6898990C3CACE5";
  const addr_user = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697dac";

  const write = true;
  const read = true;
  const exec = false;
  const res = "voiture"

  const rawTx = await getContract().methods.setAclAtb(addr_user, write, read, exec, res);

  const signedTx = await getSignedTx(rawTx, from);

  // REST API call: /transfer
  //return await sendSignedTx(signedTx, from, addr_user, write, read, exec, res);

  // direct mode - without REST API
  return await directSendSignedTx(signedTx);
})()
  .then((resp) => {
    console.log(resp);
  })
  .catch((err) => {
    console.log(err.message);
  }); 


