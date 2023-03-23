import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon, polygonMumbai } from 'wagmi/chains';
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
  } as const

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    VolaryTestnet,
    polygon,
    polygonMumbai,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
