import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import styles from './styles/app.module.css';
import Products from './contracts/Products.json';
import { ethers } from 'ethers';

function App() {
  const { account } = useAccount(); 

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    
    const contract = new ethers.Contract(
      Products.networks['8888'].address,
      Products.abi,
      provider.getSigner(account)
    );
    

    await contract.addProduct(productId, productName, productPrice)
      .then((transaction) => {
        console.log(transaction);
      });

    setProductId('');
    setProductName('');
    setProductPrice('');
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <a href=" ">ProvenX</a>
      </h1>
      <p className={styles.description}>
        Get started by connecting your account{' '}
      </p>
        <ConnectButton />
      <h3>The account you are connected to is</h3>
      <div className={styles.grid}>
        <a className={styles.card} href="https://provenx.tech">
          <h2>Manufacturer Documentation &rarr;</h2>
          <p>Learn how to use ProvenX as a Manufacturer</p>
        </a>
        <a className={styles.card} href="https://docs.metamask.io/guide/">
          <h2>Metamask Documentation &rarr;</h2>
          <p>Learn how to interact with Ethereum.</p>
        </a>
        <a
          className={styles.card}
          href="https://github.com/cheran2003/hack-a-nest"
        >
          <h2>View this project on github &rarr;</h2>
        </a>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Add Product</h2>
        <div>
          <label htmlFor="productId">Product ID</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
            required
            />
          </div>
          <div>
            <label htmlFor="productPrice">Product Price (in ETH)</label>
            <input
              type="number"
              step="0.000000000000000001"
              id="productPrice"
              value={productPrice}
              onChange={(event) => setProductPrice(event.target.value)}
              required
            />
          </div>
          <button type="submit">Add</button>
        </form>
        <footer className={styles.footer}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            ProvenX by team <span style={{ color: '#000', marginLeft: '5px' }}>
              <a href="https://provenx.tech" rel="noopener noreferrer" target="_blank" style={{ color: '#0E76FD' }}>0xc0d3r(s)</a>
            </span>
          </h3>
        </footer>
      </div>
    );
  }
  
  export default App;
  