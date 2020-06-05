const ACL = artifacts.require("ACL");
const ERC721=artifacts.require("ERC721");

module.exports = function(deployer) {
  // Deploy the Migrations contract as our only task
  deployer.deploy(ACL);
  deployer.deploy(ERC721);
};



