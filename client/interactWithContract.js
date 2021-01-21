const Web3 = require('web3')
const fs = require('fs');
const BigNumber = require('bignumber.js'); // 处理类似decimal的数字

const HDWalletProvider = require('@truffle/hdwallet-provider');

// 账户相关敏感信息，私钥签名，无0x前缀
const privateKey = fs.readFileSync("../.secret").toString().trim();

console.log("privateKey: ", privateKey)

// 账户地址：部署合约的地址
const account1 = '0x28383b9717ca0468C580dF7b970A4897a0f11202'

// 设置RPC
const provider = new HDWalletProvider(privateKey, 'https://sokol.poa.network')
const web3 = new Web3(provider)

// Kovan上的RPC需要从Infura中获取
const provider_kovan = new HDWalletProvider(privateKey, 'https://kovan.infura.io/v3/afc48dd54b2b408aa43e79ce09c5d1f5')
const web3_kovan = new Web3(provider_kovan);

// 侧链上测试合约信息，Counter
const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "increment", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getCounter", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function", "constant": true }]
const contractAddress = "0xf107BBC27dB2C1838a1804f99811B6f53BdBb6b8"

// 侧链合约信息，获取喂价数据，马上部署
const GetETHUSDPriceABI = [{ "inputs": [{ "internalType": "uint256", "name": "_price", "type": "uint256" }], "name": "setETHUSDPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getETHUSDPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const GETETHUSDPriceAddress = "0xd3a86c2b36fD3DA6bbd64423d1a494eed47a2052"

// KOVAN ETHUSD PriceFeed ABI

const ETHUSDPriceFeedABI = [{ "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }, { "internalType": "address", "name": "_accessController", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "int256", "name": "current", "type": "int256" }, { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "updatedAt", "type": "uint256" }], "name": "AnswerUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "startedBy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "startedAt", "type": "uint256" }], "name": "NewRound", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "accessController", "outputs": [{ "internalType": "contract AccessControllerInterface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "aggregator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "confirmAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "name": "phaseAggregators", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "phaseId", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "proposeAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "proposedAggregator", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "proposedGetRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proposedLatestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_accessController", "type": "address" }], "name": "setController", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const ETHUSDPriceFeedAddress = "0x9326BFA02ADD2366b30bacB125260Af641031331"


// 构建合约实例
const contractInstance = new web3.eth.Contract(contractABI, contractAddress)
const ETHUSDPriceFeedInstance = new web3_kovan.eth.Contract(ETHUSDPriceFeedABI, ETHUSDPriceFeedAddress)
const getETHUSDPriceInstance = new web3.eth.Contract(GetETHUSDPriceABI, GETETHUSDPriceAddress)

console.log("i am here....")

// =======================================
/**
 * 
 * @param {*} tokenContractAddress 传递合约地址
 */
function withdrawToken(tokenContractAddress) {
    withdrawInstance.methods.withdrawToken(tokenContractAddress).send({
        from: account1
    }).on('transactionHash', hash => {
        console.log('transactionHash: ', hash)
    }).on('receipt', receipt => {
        console.log('receipt: ', receipt)
    }).on('confirmation', (confirmationNumber, receipt) => {
        console.log("confirmation: ", confirmationNumber)
    }).on('error', console.error)
}
/**
 * 
 * @param {*} tokenContractAddress ERC20 Token Contract Address on Heco
 * @param {*} amount 填数字即可，但是注意需要转换，JS中的数字比较大，需要用BN库
 * @dev 比如，0.667，decimal为8的话，需要传的是0.667 * 10^8，一定能确保为整数
 */
function withdrawPartialToken(tokenContractAddress, decimal, amount) {
    let amountStr = amount.toString();
    let dotRightLength = amountStr.length - amountStr.split('.')[0].length;
    if (dotRightLength > decimal) {
        // 0.66666666666666666, 小数点后面位数大于decimal，则需要截断处理
        amountStr = amountStr.slice(0, decimal - dotRightLength);
    }

    let a = new BigNumber(amountStr);
    let amountBN = a.multipliedBy(Math.pow(10, decimal));
    console.log("BN is: ", amountBN.toString());
    withdrawInstance.methods.withdrawPartialToken(tokenContractAddress, amountBN).send({
        from: account1
    }).on('transactionHash', hash => {
        console.log('transactinHash: ', hash)
    }).on('receipt', receipt => {
        console.log('receipt: ', receipt)
    }).on('confirmation', (confirmationNumber, receipt) => {
        console.log("confirmation: ", confirmationNumber)
    }).on('error', console.error)
}
// ==========================

// 可以改成Promise的用法，不用.on监听回调
function increment() {
    contractInstance.methods.increment().send({
        from: account1 // optional
    }).on('transactionHash', hash => {
        console.log("transactionHash: ", hash)
    }).on('receipt', recipt => {
        console.log('receipt: ', recipt)
    })
}

async function getCounter() {
    console.log("calling...")
    // using the promise
    let resP = await contractInstance.methods.getCounter().call({ from: account1 });
    console.log('END CALL: ', resP)
}

// get ETHUSD price from kovan
async function getETHUSDFromKovan() {
    // 读取此喂价合约
    let res = await ETHUSDPriceFeedInstance.methods.latestRoundData().call({
        from: account1
    })
    console.log("latest data: ", res.answer)
}

// 将Kovan上的数据设置到侧链上
async function setETHUSDPriceOnSideChain() {
    // step 1: get data
    let res = await ETHUSDPriceFeedInstance.methods.latestRoundData().call({
        from: account1
    })
    const ETHUSDPrice = res.answer;
    console.log("ETHUSD Price is: ", ETHUSDPrice) // BigNumber 
    // step 2: set data to sidechain
    getETHUSDPriceInstance.methods.setETHUSDPrice(ETHUSDPrice).send({
        from: account1
    }).on('receipt', receipt => {
        console.log('receipt: ', receipt)
    })
}

// 从侧链上获取ETHUSD价格信息
async function getETHUSDPriceFromSideChain() {
    // 读取此喂价合约
    let price = await getETHUSDPriceInstance.methods.getETHUSDPrice().call({
        from: account1
    })
    console.log("latest price: ", price)
}


function test() {
    console.log("hello world!");
}
// getCounter(); // 调用测试
// increment();
// test()

// getETHUSDFromKovan(); // success

// setETHUSDPriceOnSideChain(); // success
getETHUSDPriceFromSideChain()