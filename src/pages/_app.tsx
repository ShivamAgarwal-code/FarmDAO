import '../styles/globals.css'
import "@rainbow-me/rainbowkit/styles.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { WagmiConfig } from "wagmi"
import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chains, wagmiClient } from "../config/walletConfig"
import { Web3Context } from 'config/Web3Context'
import Web3 from 'web3'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
           <Web3Context.Provider value={Web3}>
            <Component {...pageProps} />
    </Web3Context.Provider>
    </WagmiConfig>
  )
}