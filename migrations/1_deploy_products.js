
const Manufacturer = artifacts.require("../contracts/Manufacturer.sol");

module.exports = async function (deployer) {
    await deployer.deploy(Manufacturer);
};
