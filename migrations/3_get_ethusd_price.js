const GetETHUSDPrice = artifacts.require("GetETHUSDPrice");

module.exports = function (deployer) {
    deployer.deploy(GetETHUSDPrice);
};
