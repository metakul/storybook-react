import { getContract } from "thirdweb";
import { client } from "./client";
import { polygonAmoy } from 'thirdweb/chains';
import { inAppWallet } from "thirdweb/wallets";


export const _presaleId=import.meta.env.VITE_PRE_SALE_ID;

export const defaultChain = polygonAmoy;
// src/config.ts
export const config = {
  erc20ContractAddress: import.meta.env.VITE_ERC20_CONTRACT_ADDRESS,
  usdtContractAddress: import.meta.env.VITE_USDT_CONTRACT_ADDRESS,
  stakeContractAddress: import.meta.env.VITE_STAKE_CONTRACT_ADDRESS,
  dexContractAddress: import.meta.env.VITE_DEX_CONTRACT_ADDRESS,
  dexStorageAddress: import.meta.env.VITE_DEX_STORAGE_ADDRESS,
};

export const erc20contract = getContract({
  client,
  address: config.erc20ContractAddress,
  chain: defaultChain,
});
export const usdtContract = getContract({
  client,
  address: config.usdtContractAddress,
  chain: defaultChain,
});

export const stakingContract = getContract({
  client,
  address: config.stakeContractAddress,
  chain: defaultChain,
});

export const dexStorageContract = getContract({
  client,
  address: config.dexStorageAddress,
  chain: defaultChain,
});

export const dexContract = getContract({
  client,
  address: config.dexContractAddress,
  chain: defaultChain,
});
export const wallets = [
  inAppWallet({
    smartAccount: {
      chain: defaultChain,
      sponsorGas: true,
    },
  }),
];

// src/config.ts
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};