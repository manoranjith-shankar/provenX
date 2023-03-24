import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useWeb3React } from '@web3/core';
import { useState } from 'react';
import styles from './styles/app.module.css';
import ProductsContract from './contracts/Products.json';

function App() {

  const { account, library } = useWeb3React();
  const { address } = useAccount();

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const contract = new library.eth.Contract(
      ProductsContract.abi,
      ProductsContract.networks[5777].address
    );

    await contract.methods.addProduct(productId, productName, productPrice)
      .send({ from: account });

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
      <h3>The account you are connected to is { address }</h3>
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
