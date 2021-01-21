// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract GetETHUSDPrice {
  uint256 eth_usd_price; // 安全起见建议用SafeMath

    function setETHUSDPrice(uint256 _price) external {
        eth_usd_price = _price;
    }
    function getETHUSDPrice() public view returns(uint256) {
        return eth_usd_price;
    }
}

