import { useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/app.module.css';
import { useAccount } from 'wagmi';
import supplychain from '../contracts/supplychain.json';

function TotalProducts() {
  const { account } = useAccount();
  const [manufacturerId, setManufacturerId] = useState('');
  const [totalProducts, setTotalProducts] = useState('');
  const [productIds, setProductIds] = useState(null);
  const [error, setError] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  async function handleSubmit(event) {
    event.preventDefault();
  
    const contract = new ethers.Contract(
      supplychain.networks['80001'].address,
      supplychain.abi,
      provider.getSigner(account)
    );
  
    try {
      const [batchIds, totalProducts] = await contract.getProducts(manufacturerId);
      setProductIds(batchIds);
      setTotalProducts(totalProducts);
    } catch (error) {
      setError(error);
    }
  }  
  
  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit} className={styles.card1}>
        <h2>Total Bacthes</h2>
        <div>
          <label htmlFor="manufacturerId">ManufacturerId</label>
          <input
            type="text"
            id="manufacturerId"
            value={manufacturerId}
            onChange={(event) => setManufacturerId(event.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Get all products
        </button>
      </form>
  
      {/* Display product IDs and total number of products */}
      {productIds && (
      <div>
        <h3>Batch IDs:</h3>
        <ul>
          {productIds.map((batchId, index) => (
            <li key={index}>{batchId}</li>
          ))}
        </ul>
        <p>Total Bacthes: {totalProducts.toString()}</p>
      </div>
      )}

      {/* Display error message */}
      {error && (
        <p style={{ fontSize: '16px', color: 'red', width: '16px'}}>{error.message}</p>
      )}
    </div>
  );
}

export default TotalProducts;
