import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {

  const { address } = useAccount({
    onConnect: () => {
      (`Connected account:` + address);
    }
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>ProvenX</title> 
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Welcome to <a href="">ProvenX</a>
        </h1>

        <p className={styles.description}>
          Get started by connecting your account{''}
        </p>

        <div className={styles.grid}>
          <a className={styles.card} href="provenx.tech">
            <h2>Manufacturer Documentation &rarr;</h2>
            <p>Learn how to use provenX as a Manufacturer</p>
          </a>

          <a className={styles.card} href="https://docs.metamask.io/guide/">
            <h2>Metamask Documentation &rarr;</h2>
            <p>Learn how to interact with Ethereum.</p>
          </a>

          {/* <a
            className={styles.card}
            href="https://github.com/rainbow-me/rainbowkit/tree/main/examples"
          >
            <h2>RainbowKit Examples &rarr;</h2>
            <p>Discover boilerplate example RainbowKit projects.</p>
          </a>

          <a className={styles.card} href="https://nextjs.org/docs">
            <h2>Next.js Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            className={styles.card}
            href="https://github.com/vercel/next.js/tree/canary/examples"
          >
            <h2>Next.js Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a> */}

          <a
            className={styles.card}
            href="https://github.com/cheran2003/hack-a-nest"
          >
            <h2>View this project on github &rarr;</h2>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://provenx.tech" rel="noopener noreferrer" target="_blank">
          <h3>
            ProvenX Under development by team <span style={{ color: '#0E76FD' }}>0xc0d3r(s)</span>
          </h3>
        </a>
      </footer>
    </div>
  );
};

export default Home;
