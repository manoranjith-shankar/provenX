import { useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/app.module.css';
import { useAccount } from 'wagmi';
import supplychain from '../contracts/supplychain.json';

function ProductTimeline() {
  const { account } = useAccount();
  const [productId, setProductId] = useState('');
  const [timelineData, setTimelineData] = useState({ timestamps: [] });
  const [transaction, setTransaction] = useState('');
  const [error, setError] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  async function handleSubmit(event) {
    event.preventDefault();
    
    const contract = new ethers.Contract(
      supplychain.networks['8888'].address,
      supplychain.abi,
      provider.getSigner(account)
    );

    // Call the contract method to get the product timeline data
    try {
      console.log(`Getting timeline data for productId ${productId}`);
      const timelineDetails = await contract.getProductTimeline(productId);
      console.log(`Timeline data for productId ${productId}: `, timelineDetails);
      setTimelineData(timelineDetails);
      setTransaction(timelineDetails.hash);
    } catch (err) {
      console.error(`Error getting timeline data for productId ${productId}: `, err);
      setError(err);
    }
  }

  console.log('timelineData:', timelineData);

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit} className={styles.card1}>
        <h2>Product Timeline</h2>
        <div>
          <label htmlFor="productId">Product Id</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Get Timeline
        </button>
      </form>


      {/* Display the timeline data */}
      {timelineData && timelineData.timestamps && timelineData.timestamps.length > 0 && (
        <div>
          <h3>Timeline Data:</h3>
          <ul>
            {timelineData.timestamps.map((timestamp, i) => (
              <li key={i}>
                <p>Timestamp: {timestamp}</p>
                <p>Description: {timelineData.descriptions[i]}</p>
                <p>New Owner Type: {timelineData.newOwnerTypes[i]}</p>
                <p>Owner: {timelineData.owners[i]}</p>
              </li>
            ))}
          </ul>
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

      {/* Display error message */}
      {error && (
        <p style={{ fontSize: '16px', color: 'red' }}>{error.message}</p>
      )}
    </div>
  );
}

export default ProductTimeline;

