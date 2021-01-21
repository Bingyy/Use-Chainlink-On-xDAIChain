# Use-Chainlink-On-xDAIChain
Actively push offchain data to xDAIChain


### Project Structure

This project is built with `truffle init`.

Basic Structure:

- contracts
- migrations
- test
- truffle-config.js

After `truffle compile` or `truffle migrate`, it will generate a directory which is called `build` and it is used for storing the ABI files of contracts.

I add the directory of `client` which stores the Node.js script to interact with contracts on xDAIChain and ethereum mainnet or testnet.


### Environment Setting

```bash
npm install @truffle/hdwallet-provider
```

### RPC Setting inside `networks` section:

```js
 sokol: {
      provider: () => new HDWalletProvider(privateKey, `https://sokol.poa.network`),
      network_id: 77,
      gas: 500000,
      gasPrice: 1000000000
    },
    xdai: {
      provider: function () {
        return new HDWalletProvider(
          privateKey,
          "https://dai.poa.network")
      },
      network_id: 100,
      gas: 500000,
      gasPrice: 1000000000
    },
```

### Execution

