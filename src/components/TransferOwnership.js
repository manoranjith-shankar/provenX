import { useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/app.module.css';
import { useAccount } from 'wagmi';
import supplychain from '../contracts/supplychain.json';


function TransferOwnership() {
  const { account } = useAccount();
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState({});
  const [newOwnerType, setNewOwnerType] = useState('');
  const [newOwner, setNewOwner] = useState('');
  const [newOwnerId, setNewOwnerId] = useState('');
  const [transaction, setTransaction] = useState('');
  const [Error, setError] = useState('');

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
      const productDetails = await contract.transferOwnership(productId, newOwnerType, newOwner, newOwnerId);
      setProductInfo(productDetails);
      setTransaction(productDetails.hash);
    } catch (err) {
      setError(err);
    }
    setTimeout(() => {
      setError('');
    }, 3000);
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
          {Error && <p style={{ fontSize:"16px", color: 'red' }}>Invalid OwnerType</p>}
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
        <div>
          <label htmlFor="newOwnerId">newOwnerId</label>
          <input
            type="Id"
            id="newOwnerId"
            value={newOwnerId}
            onChange={(event) => setNewOwnerId(event.target.value)}
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
          href={`https://mumbai.polygonscan.com/tx/${transaction}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Your transaction is successful: {transaction}
        </a>
      )}
    </div>
  );
}

export default TransferOwnership;