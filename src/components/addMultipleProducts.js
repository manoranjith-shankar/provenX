import { useAccount } from 'wagmi';
import { useState } from 'react';
import styles from '../styles/app.module.css';
import { ethers } from 'ethers';
import supplychain from '../contracts/supplychain.json';

function AddMultipleProducts() {
  const { account } = useAccount();
  let { address } = useAccount();
  if (!address) {
    address = 'You are not connected';
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [products, setProducts] = useState([]);
  const [Error, setError] = useState('');
  const [transaction, setTransaction] = useState('');

  async function addProduct(productId, productName, productPrice, productbatchId, productDescription) {
    const contract = new ethers.Contract(
      supplychain.networks['8888'].address,
      supplychain.abi,
      provider.getSigner(account)
    );
  
    try {
      // Remove dollar sign and parse price as a number
      const parsedPrice = parseFloat(productPrice.replace('$', ''));
  
      const result = await contract.addProduct(
        productId,
        productName,
        ethers.utils.parseEther(parsedPrice.toString()), // Convert price to wei
        productbatchId,
        productDescription
      );
      console.log(result);
      setTransaction(result.hash);
      setError('');
  
      const productInfo = await contract.getProduct(productId);
      console.log('Product Info:', productInfo);
    } catch (err) {
      setError(err.message);
    }
  }  

  async function handleFileUpload(event) {
    event.preventDefault();
  
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      const rows = text.split('\n').map(row => row.split(','));
      console.log('rows:', rows);
      if (rows.length > 0) {
        const newProducts = rows.map(row => ({
          productId: row[0],
          productName: row[1],
          productPrice: row[2],
          productbatchId: row[3],
          productDescription: row[4],
        }));
        console.log('newProducts:', newProducts);
        setProducts(newProducts);
      
        for (const product of newProducts) {
          await addProduct(product.productId, product.productName, product.productPrice, product.productbatchId, product.productDescription);
        }
      } else {
        console.log('No data in file');
      }      
    };
    reader.readAsText(file);
  }  
  
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <form onSubmit={handleFileUpload} className={styles.card1}>
          <h2>Add Products</h2>
          <div>
            <label htmlFor="file">CSV file:</label>
            <input type="file" id="file" onChange={(event) => handleFileUpload(event)} />
          </div>
          <button type="submit" className={styles.button}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMultipleProducts;
