// addProducts.js
const fs = require('fs');
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const parse = require('csv-parse');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const mnemonic = 'frown reason middle hen hidden tool vault mixed december loud jazz burden'; // replace with your actual mnemonic phrase
const providerUrl = 'https://rpc-public-testnet.volary.io/'; // replace with your actual provider URL
const contractAddress = '0x00161e8a962111A8eb9DE5c74E7c45793D101244'; // Replace with the actual contract address
const abi = require('./build/contracts/Products.json').abi;

const web3 = new Web3(new HDWalletProvider(mnemonic, providerUrl,{timeout: 300000}));
const contract = new web3.eth.Contract(abi, contractAddress);
const fromAddress = '0xc09AA2837EF2f70a33b4d49C59DCD4e779eF92Eb';

const inputFile = 'products.csv';
const transactionHashes = [];

fs.createReadStream(inputFile)
  .pipe(parse({ delimiter: ',' }))
  .on('data', async function (row) {
    const id = parseInt(row[0], 16);
    if (isNaN(id)) {
      console.error(`Invalid id value: ${row[0]}`);
      return; // skip this row and continue with the next row
    }
    const priceStr = row[2].replace('$', ''); // remove $ symbol from price string
    const price = Web3.utils.toWei(priceStr.toString(), 'ether');
    const name = row[1];
    console.log(`Adding product ${row[0]}: ${name} (${priceStr})`);
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods.addProduct(id, name, price).send({ from: fromAddress });
    fs.writeFileSync('transaction_hashes.csv', transactionHashes.join(','));
    console.log(`Transaction hash: ${result.transactionHash}`);
    transactionHashes.push(result.transactionHash);
    console.log('Finished adding product');
  });

