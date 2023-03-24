import { useState } from 'react';
import Products from '../contracts/Products.json';
import { ethers } from 'ethers';
import styles from '../styles/app.module.css';
import { useAccount } from 'wagmi';

function TrackProduct(props) {
  const { account } = useAccount(); 
  const [index, setIndex] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [transaction, setTransaction] = useState('');
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  

  async function handleSubmit(event) {
    event.preventDefault();
    
    
    const contract = new ethers.Contract(
      Products.networks['8888'].address,
      Products.abi,
      provider.getSigner(account)
    );

    const productCount = await contract.getProductsCount;
    console.log(productCount);

    // Call the contract method to get the product details
    const productDetails = await contract.getProduct(index);

    if (productDetails.id && productDetails.name && productDetails.price) {
      setProductName(productDetails.name);
      setProductPrice(productDetails.price);
    }
  }

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit} className={styles.card1}>
        <h2>Track Product</h2>
        <div>
          <label htmlFor="index">Product Index</label>
          <input
            type="text"
            id="index"
            value={index}
            onChange={(event) => setIndex(event.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Get details</button>
      </form>

      {/* Display the product details */}
      {productName && (
        <div>
          <p>Product Name: {productName}</p>
          <p>Product Price: {productPrice}</p>
        </div>
      )}

      {/* Display the transaction hash */}
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
  );
}

export default TrackProduct;