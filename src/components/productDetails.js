import { useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/app.module.css';
import { useAccount } from 'wagmi';
import supplychain from '../contracts/supplychain.json';


function ProductDetails() {
  const { account } = useAccount();
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState({});
  const [transaction, setTransaction] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  async function handleSubmit(event) {
    event.preventDefault();

    const contract = new ethers.Contract(
      supplychain.networks['80001'].address,
      supplychain.abi,
      provider.getSigner(account)
    );

    // Call the contract method to get the product details
    try {
      const productDetails = await contract.getProductInfo(productId);
      setProductInfo(productDetails);
      setTransaction(productDetails.hash);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit} className={styles.card1}>
        <h2>Get ProductDetails</h2>
        <div>
          <label htmlFor="productId">Product Id</label>
          <input
            type="text"
            id="Id"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Get details</button>
      </form>

      {/* Display the product details and the transaction hash */}
      {productInfo.name && (
        <div className={styles.card}>
          <p>Product Name: {productInfo.name}</p>
          <p>Product Price: {productInfo.price.toString()}</p>
          <p>Product Description: {productInfo.productDescription}</p>
          <p>Owner: {productInfo.owner}</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
