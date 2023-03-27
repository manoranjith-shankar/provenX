import { useAccount } from 'wagmi';
import { useState } from 'react';
import styles from '../styles/app.module.css';
import Products from '../src/contracts/Products.json';
import { ethers } from 'ethers';

function AddProduct(props) {
  const { account } = useAccount();
  let { address } = useAccount();
  if (!address) {
    address = 'You are not connected';
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [transaction, setTransaction] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const contract = new ethers.Contract(
      Products.networks['8888'].address,
      Products.abi,
      provider.getSigner(account)
    );

    await contract
      .addProduct(props.productId, productName, productPrice)
      .then((transaction) => {
        console.log(transaction);
        setTransaction(transaction.hash);
      });

    setProductId('');
    setProductName('');
    setProductPrice('');
  }

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.card1}>
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
          <button type="submit" className={styles.button}>
            Add
          </button>
        </form>
        {transaction && (
          <a
            href={`https://explorer.volary.io/tx/${transaction}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Your transaction is successful: View on explorer {transaction}
          </a>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
