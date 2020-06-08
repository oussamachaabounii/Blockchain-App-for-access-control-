// Require Web3 Module

//var express = require('express');
//var router = express.Router();
//var ethTx = require('ethereumjs-tx');
const { web3, privateKeys, erc721Address, address, getErcContract, getContract } = require("./utils");
//const axios = require("axios");
//const assert = require("assert");
const {
    getSignedTxerc,
    //sendSignedTx,
    directSendSignedTx,
} = require("./sendSignTransaction");

(async () => {

    //const from = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
    const from = address[1];

    const addr_To = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
    const ms = "write";
    const res = "voiture";
    const id_Token = 1;



    const acess = await getContract().methods.hasRight(addr_To, ms, res).call();


   if (acess) {

        
            const rawTx = await getErcContract().methods._mint(addr_To, id_Token);
            const signedTx = await getSignedTxerc(rawTx, from);

            return await directSendSignedTx(signedTx);
   

    } 

})()
    .then((resp) => {
        console.log(resp);
    })
    .catch((err) => {
        console.log(err.message);
    });

