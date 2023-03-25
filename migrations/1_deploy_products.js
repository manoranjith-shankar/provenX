
const supplychain = artifacts.require("../contracts/supplychain.sol");

module.exports = async function (deployer) {
    await deployer.deploy(supplychain);
};
