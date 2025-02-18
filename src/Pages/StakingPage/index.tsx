import { Box, Container, TextField, Button, MenuItem, Typography } from '@mui/material';
import { useActiveAccount, useSendTransaction, useReadContract } from "thirdweb/react";
import { erc20contract, stakingContract } from '../../config';
import { prepareContractCall } from 'thirdweb';
import { useState } from 'react';
import StakedInfo from './StakedInfo';

function StakingPage() {
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  // State for staking amount and duration
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState(30); // Default to 30 days

  // Staking duration options (in days)
  const stakingDurations = [
    { value: 2592000, label: '30 Days' },
    { value: 7776000, label: '3 Months' },
    { value: 15552000, label: '6 Months' },
    { value: 31536000, label: '1 Year' },
  ];

  // Fetch ERC20 token balance
  const { data: erc20Balance, isLoading: isBalanceLoading } = useReadContract({
    contract: erc20contract,
    method: "function balanceOf(address owner) returns (uint256)",
    params: [account?.address || "0x"], // Use account address or fallback to "0x"
  });
  const { data: erc20Symbol } = useReadContract({
    contract: erc20contract,
    method: "function symbol() returns (string)",
    params: [], // Use account address or fallback to "0x"
  });

  // Handle staking
  const handleStake = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (amount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    // Convert amount to token decimals (assuming 18 decimals)
    const amountInWei = BigInt(amount * 1e18);

    // Check if the user has sufficient balance
    if (erc20Balance === undefined || amountInWei > erc20Balance) {
      alert("Insufficient token balance.");
      return;
    }

    try {
      // Step 1: Approve the staking contract to spend the tokens
      const approveTx = prepareContractCall({
        contract: erc20contract,
        method: "function approve(address spender, uint256 amount)",
        params: [stakingContract.address, amountInWei],
      });
      await sendTransaction(approveTx);

      console.log("Approval successful:", approveTx);

      // Step 2: Stake the tokens
      const stakeTx = prepareContractCall({
        contract: stakingContract,
        method: "function stake(uint256 amount, uint256 stakingPeriod)",
        params: [amountInWei, BigInt(duration)], // Convert days to seconds
      });
      await sendTransaction(stakeTx);

    } catch (error) {
      console.error("Staking failed:", error);
      alert("Staking failed. Please try again.");
    }
  };

  return (
    <Container>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 4,
      }}>
        <Typography variant="h4">Staking Page</Typography>
        <div>
          <p>Wallet address: {account?.address}</p>
          <p>
            ERC20 Balance:{" "}
            {isBalanceLoading
              ? "Loading..."
              : erc20Balance !== undefined
              ? `${(Number(erc20Balance) / 1e18).toLocaleString()} ${erc20Symbol}`
              : "N/A"}
          </p>
        </div>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <TextField
          label="Amount to Stake"
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        />

        <TextField
          select
          label="Staking Duration"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          {stakingDurations.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleStake}
          disabled={!account || amount <= 0 || isBalanceLoading}
        >
          Stake
        </Button>
      </Box>

      <StakedInfo/>
    </Container>
  );
}

export default StakingPage;