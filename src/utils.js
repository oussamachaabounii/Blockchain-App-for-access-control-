const Web3 = require("web3");
const aclArtifact = require("../build/contracts/ACL.json");
const erc721Artifact = require("../build/contracts/ERC721.json");

const web3_provider_host =
  process.env.PRODUCTION_WEB3_PROVIDER_HOST || "http://127.0.0.1";
const web3_provider_port = process.env.PRODUCTION_WEB3_PROVIDER_PORT || 8545;
const provider = `${web3_provider_host}:${web3_provider_port}`;

const web3 = new Web3(new Web3.providers.HttpProvider(provider));


const aclAddress = "0x446e083592D2dFa6661E20097F6898990C3CACE5";
const erc721Address = "0xFa5B6432308d45B54A1CE1373513Fab77166436f";

const privateKeys = [
  "8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
  "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3",
  "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f",
];

const address = [
  web3.eth.accounts.privateKeyToAccount(privateKeys[0]).address,
  web3.eth.accounts.privateKeyToAccount(privateKeys[1]).address,
  web3.eth.accounts.privateKeyToAccount(privateKeys[2]).address,
];

function getContract() {
  let c = new web3.eth.Contract(aclArtifact.abi, aclAddress);
  contract = c.clone();
  return contract;
}

function getErcContract() {
  let co = new web3.eth.Contract(erc721Artifact.abi, erc721Address);
  contract = co.clone();
  return contract;
}

  module.exports = {
    privateKeys: privateKeys,
    address: address,
    web3: web3,
    getContract: getContract,
    getErcContract: getErcContract,
    aclAddress: aclAddress,
    erc721Address: erc721Address,
    host: process.env.APP_HOST || "127.0.0.1",
    port: process.env.APP_PORT || 3000,
  };