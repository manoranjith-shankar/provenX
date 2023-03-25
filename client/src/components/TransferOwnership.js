import { useState } from 'react';
import Manufacturer from '../contracts/Manufacturer.json';
import { ethers } from 'ethers';
import styles from '../styles/app.module.css';
import { useAccount } from 'wagmi';

function TransferOwnership(props) {
  const { account } = useAccount();
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState({});
  const [newOwnerType, setNewOwnerType] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [transaction, setTransaction] = useState('');

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  async function handleSubmit(event) {
    event.preventDefault();

    const contract = new ethers.Contract(
      Manufacturer.networks['8888'].address,
      Manufacturer.abi,
      provider.getSigner(account)
    );

    // Call the contract method to get the product details
    try {
      const productDetails = await contract.transferOwnership(productId, newOwnerType, newOwner);
      setProductInfo(productDetails);
      setTransaction(productDetails.hash);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.card}>
      <form onSubmit={handleSubmit} className={styles.card1}>
        <h2>TransferOwnership</h2>
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
        <div>
          <label htmlFor="newOwnerType">newOwnerType</label>
          <input
            type="text"
            id="newOwnerType"
            value={newOwnerType}
            onChange={(event) => setNewOwnerType(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newOwner">newOwner address</label>
          <input
            type="address"
            id="newOwner"
            value={newOwner}
            onChange={(event) => setNewOwner(event.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>TransferOwnership</button>
      </form>

      {/* Display the product details */}
      {productInfo.name && (
        <div>
          <p>Product Name: {productInfo.name}</p>
          <p>Product Price: {productInfo.price.toString()}</p>
          <p>Product Description: {productInfo.productDescription}</p>
          <p>Owner: {productInfo.owner}</p>
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

export default TransferOwnership;