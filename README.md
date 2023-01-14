## Table of Contents
1. [General Info](#general-info)
2. [Prerequisites](#prerequisites)
3. [Installation Dapp](#installation-dapp)
4. [Launch Dapp](#launch-dapp)
5. [Known bugs](#known-bugs)
6. [Ganache and MetaMask settings](#ganache-an-metamask-settings)


## General Info

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system.

![Supply chain flow](images/simplesupplychain.png)


The starter code is written for **Solidity v0.8.1**

(please refer to Solidity [documentation](https://docs.soliditylang.org/en/v0.8.1/index.html) for more details). 

To use this starter code, please run `npm i -g truffle@5.7.0` to install Truffle v4 with Solidity v0.8.1. 

## Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

For this project, you will need to have:
* Node and NPM
* Truffle
* Ganache

Node and NPM installed - NPM is distributed with Node.js
#### Check Node version
```
node -v
v18.12.1
```
#### Check NPM version
```
npm -v
8.19.2
```

#### Install Truffle
```
npm i -g truffle@5.7.0
```


## Installation Dapp


Clone this repository:

```
git clone https://github.com/thomasbln/lemonade-supply-chain.git
```

```
cd  lemonade-supply-chain
```


Launch Ganache

```
truffle develop
```

Your terminal should look something like this:

![truffle test](images/truffle_develop.png)

In a separate terminal window, Compile smart contracts:

```
truffle compile
```

Your terminal should look something like this:

![truffle test](images/truffle_compile.png)

Test smart contracts

```
truffle test
```

Your terminal should look something like this:

![truffle test](images/truffle_test.png)



Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate --reset
```
This will create the smart contract artifacts in folder ```build\contracts```.
Your terminal should look something like this:

![truffle test](images/truffle_migrate.png)



## Launch Dapp 
In a separate terminal window, launch the DApp:

```
cd  lemonade-supply-chain/app
npm run dev
```
Open your browser:  http://localhost:8080
 
 
## Known bugs

#### ERR_OSSL_EVP_UNSUPPORTED

In a terminal window:

```
export NODE_OPTIONS=--openssl-legacy-provider
```
launch the DApp:

```
cd  lemonade-supply-chain/app
npm run dev
```


## Ganache and MetaMask settings

#### New Workspace

![Ganache New Workspace](images/Ganache-new-workspace.png)

#### Export private key

![Ganache private key](images/Ganache-private-key.png)


#### Ganache project settings

![Ganache procect settings](images/Ganache-project-settings.png)

#### MetaMask import Account

![MetaMask add new network](images/MetaMask-import-key.png)

#### MetaMask add localhost:7545 network 

(truffle-config.js)

![MetaMask add new network](images/MetaMask-add-network.png)
