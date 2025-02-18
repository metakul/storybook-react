import { getContract } from "thirdweb";
import { client } from "./client";
import { polygon } from 'thirdweb/chains';

// src/config.ts
export const config = {
    erc20ContractAddress: import.meta.env.VITE_ERC20_CONTRACT_ADDRESS,
    stakeContractAddress: import.meta.env.VITE_STAKE_CONTRACT_ADDRESS,
  };
  
export const erc20contract = getContract({
      client,
      address: config.erc20ContractAddress,
      chain: polygon,
    });
    
export const stakingContract = getContract({
      client,
      address: config.stakeContractAddress,
      chain: polygon,
    });