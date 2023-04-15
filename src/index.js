import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'
import App from './App';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const VolaryTestnet = {
  id: 8888,
  name: 'Volary Testnet',
  network: 'Volary',
  nativeCurrency: {
  decimals: 18,
  name: 'Volary',
  symbol: 'VLRY',
  },
    iconUrl: 'https://nes.tech/wp-content/uploads/2022/09/nest_logo.png',
  rpcUrls: {
  public: { http: ['https://rpc-public-testnet.volary.io/'] },
  default: { http: ['https://rpc-public-testnet.volary.io/'] },
  },
  blockExplorers: {
  etherscan: { name: 'VolaryExplorer', url: 'https://explorer.volary.io/' },
  default: { name: 'VolaryExplorer', url: 'https://explorer.volary.io/' },
  },
  contracts: {
  multicall3: {
  address: '0xca11bde05977b3631167028862be2a173976ca11',
  blockCreated: 1,
  },
  },
  }

const { chains, provider } = configureChains(
  [mainnet, polygonMumbai, polygon, VolaryTestnet, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'provenX',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
            <App />
      </RainbowKitProvider>
    </WagmiConfig>
);

