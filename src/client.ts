// src/client.ts
import { createThirdwebClient } from "thirdweb";
import { polygon } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
 
export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_PUBLIC_THIRDWEB_CLIENT_ID,
});

export const wallets = [
  inAppWallet({
    smartAccount: {
      chain: polygon,
      sponsorGas: true,
    },
  }),
];