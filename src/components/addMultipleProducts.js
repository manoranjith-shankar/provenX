import { useAccount } from 'wagmi';
import { useState } from 'react';
import styles from '../styles/app.module.css';
import { ethers } from 'ethers';
import supplychain from '../contracts/supplychain.json';
import Papa from "papaparse";

function AddMultipleProducts() {
  const { account } = useAccount();
  let { address } = useAccount();
  if (!address) {
    address = 'You are not connected';
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const [csvFile, setCsvFile] = useState(null);
  const [productsAdded, setProductsAdded] = useState([]);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const { data } = Papa.parse(text, { header: false });
      const newProducts = [];
      const contract = new ethers.Contract(
        supplychain.networks['8888'].address,
        supplychain.abi,
        provider.getSigner(account)
      );
      for (const row of data) {
        const [id, name, price, batchId, productDescription] = row;
        try {
          const result = await contract.addProduct(id, name, parsePrice(price), parseInt(batchId), productDescription);
          newProducts.push({ id, name, price, batchId, productDescription });
        } catch (err) {
          console.error(err);
        }
      }
      setProductsAdded(newProducts);
    };
    reader.readAsText(csvFile);
  };

  const parsePrice = (price) => {
    return ethers.utils.parseEther(price);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.card1}>
          <h2>Add Multiple Products</h2>
          <div>
            <label htmlFor="csv-file">Upload CSV File:</label>
            <input type="file" id="csv-file" accept=".csv" onChange={handleFileChange} />
          </div>
          <button type="submit" className={styles.button}>Add Products</button>
        </form>
        {productsAdded.length > 0 && (
          <div>
            <h3>Products Added:</h3>
            <ul>
              {productsAdded.map((product) => (
                <li key={product.id}>
                  {product.name} ({product.id})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddMultipleProducts;
