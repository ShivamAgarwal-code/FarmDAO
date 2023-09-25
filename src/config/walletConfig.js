import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import {
  argentWallet,
  braveWallet,
  trustWallet,
  ledgerWallet,
  omniWallet,
  imTokenWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_URL as string }),
    publicProvider(),
  ]
);
const { wallets } = getDefaultWallets({
  appName: "MNS",
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "More",
    wallets: [
      trustWallet({
        chains,
        shimDisconnect: true,
      }),
      argentWallet({ chains }),
      braveWallet({
        chains,
        shimDisconnect: true,
      }),
      ledgerWallet({ chains }),
      omniWallet({ chains }),
      imTokenWallet({ chains }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});
