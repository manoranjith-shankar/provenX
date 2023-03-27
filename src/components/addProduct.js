import { useAccount } from 'wagmi';
import { useState } from 'react';
import styles from '../styles/app.module.css';
import { ethers } from 'ethers';
import supplychain from '../contracts/supplychain.json';

function AddProduct() {
  const { account } = useAccount();
  let { address } = useAccount();
  if (!address) {
    address = 'You are not connected';
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productbatchId, setproductBatchId] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [Error, setError] = useState('');
  const [transaction, setTransaction] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const contract = new ethers.Contract(
      supplychain.networks['8888'].address,
      supplychain.abi,
      provider.getSigner(account)
    );

    try {
        const result = await contract.addProduct(
          productId,
          productName,
          productPrice,
          productbatchId,
          productDescription
        );
        console.log(result);
        setTransaction(result.hash);
        setError('');
      } catch (err) {
        setError(err.message);
      }

    setProductId('');
    setProductName('');
    setProductPrice('');
    setproductBatchId('');
    setProductDescription('');

    setTimeout(() => {
      setError('');
    }, 3000);
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
             {Error && <p style={{ fontSize:"16px", color: 'red' }}>Product Id already Exists</p>}
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
          <div>
            <label htmlFor="productbatchId">BacthId</label>
            <input
              type="number"
              step="0.000000000000000001"
              id="productbatchId"
              value={productbatchId}
              onChange={(event) => setproductBatchId(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="productPrice">Product description</label>
            <input
              type="text"
              step="0.000000000000000001"
              id="productPrice"
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Add
          </button>
        </form>
      </div>
        <div className={styles.grid}>
        {transaction && (
            <div className={styles.transaction}>
              <span style={{ color: '#000', fontSize: '1.5rem' }}>Product Added successfully:</span>
              <a
                href={`https://explorer.volary.io/tx/${transaction}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >{transaction}
              </a>
            </div>
          )}
          </div>
    </div>
  );
}

export default AddProduct;