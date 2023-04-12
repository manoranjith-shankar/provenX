import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from './styles/app.module.css';
import ProductDetails from './components/productDetails';
import AddProduct from '../src/components/addProduct';
import TransferOwnership from './components/TransferOwnership';
import ProductTimeline from './components/ProductTimeline';
import AddMultipleProducts from './components/addMultipleProducts';
import SideNavBar from './NavBar/SideNavBar';

function App() {
  let { address } = useAccount();
  if (!address){
    address = ("You are not connected")
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <a href=" ">ProvenX - Manufacturer</a>
      </h1>
      <p className={styles.description}>
        Get started by connecting your account{' '}
      </p>
        <ConnectButton />
      <h3>Connection status:  <a href=' ' style={{ color: '#0E76FD' }}>{ address }</a></h3>
      
      <div className={styles.grid}>
          <AddProduct />
          <TransferOwnership />
          <ProductDetails />
          <ProductTimeline  />
          <AddMultipleProducts />
        </div>

      <div className={styles.grid}>
        <a className={styles.card} href="https://0xc0d3rs.tech">
          <h2>Manufacturer Documentation &rarr;</h2>
          <p>Learn how to use ProvenX as a Manufacturer</p>
        </a>
        <a className={styles.card} href="https://docs.metamask.io/guide/">
          <h2>Metamask Documentation &rarr;</h2>
          <p>Learn how to interact with Ethereum.</p>
        </a>
        <a
          className={styles.card}
          href="https://github.com/cheran2003/hack-a-nest"
        >
          <h2>View this project on github &rarr;</h2>
        </a>
      </div>
        
        <footer className={styles.footer}>
          <h3 style={{ display: 'flex', alignItems: 'center' }}>
            ProvenX by team <span style={{ color: '#000', marginLeft: '5px' }}>
              <a href="https://0xc0d3rs.tech" rel="noopener noreferrer" target="_blank" style={{ color: '#0E76FD' }}>0xc0d3r(s)</a>
            </span>
          </h3>
        </footer>
      </div>
    );
  }
  
  export default App;
  