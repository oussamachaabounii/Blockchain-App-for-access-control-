const { web3, aclArtifact, aclAddress,erc721Address,getContract, host, port } = require("./utils");


var ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "requester",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "resource",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "read",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "write",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "exec",
				"type": "bool"
			}
		],
		"name": "setAclInfo",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_read",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_write",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_exec",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_resource",
				"type": "string"
			}
		],
		"name": "setAclAtb",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "countList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "req",
				"type": "address"
			}
		],
		"name": "countRequtsForAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "ins",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "resource",
				"type": "string"
			}
		],
		"name": "getAclAtb",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "req",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "ms",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "resource",
				"type": "string"
			}
		],
		"name": "hasRight",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "req",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "resource",
				"type": "string"
			}
		],
		"name": "hasRightExec",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "req",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "resource",
				"type": "string"
			}
		],
		"name": "hasRightRead",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "req",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "resource",
				"type": "string"
			}
		],
		"name": "hasRightWrite",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "reqAccts",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var acl = new web3.eth.Contract(ABI, aclAddress);
acl.methods.owner().call().then(console.log);
acl.methods.getAclAtb("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae","voiture").call().then(console.log);