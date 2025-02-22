import { useState, useEffect } from 'react';
import { Box, Container, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useActiveAccount, useSendTransaction, useReadContract } from "thirdweb/react";
import { config, erc20contract, dexContract } from '../../config';
import { prepareContractCall } from 'thirdweb';
import { getColors } from '../../layout/Theme/themes';
import { TokenInput } from '../../components/TokenInput/TokenInput';
import LoadingButtonWrapper from '../StakingPage/LoadingButtonWrapper';

const FIXED_EXCHANGE_RATE = 100; // Example: 1 BUSD = 100 THAI

const StakingPage: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const [busdAmount, setBusdAmount] = useState<number>(0);
  const [thaiAmount, setThaiAmount] = useState<number>(0);
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const { data: erc20Balance, isLoading: isBalanceLoading } = useReadContract({
    contract: erc20contract,
    method: "function balanceOf(address owner) returns (uint256)",
    params: [account?.address || "0x"],
  });

  const { data: erc20Symbol } = useReadContract({
    contract: erc20contract,
    method: "function symbol() returns (string)",
    params: [],
  });

  // Sync Thai token input when BUSD input changes
  useEffect(() => {
    setThaiAmount(busdAmount * FIXED_EXCHANGE_RATE);
  }, [busdAmount]);

  const handleApprove = async (): Promise<void> => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (busdAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const amountInWei = BigInt(Math.floor(busdAmount * 1e18));

    if (erc20Balance === undefined || amountInWei > erc20Balance) {
      alert("Insufficient token balance.");
      return;
    }

    try {
      setIsApproving(true);
      const approveTx = prepareContractCall({
        contract: erc20contract,
        method: "function approve(address spender, uint256 amount)",
        params: [dexContract.address, amountInWei],
      });
      await sendTransaction(approveTx);
      console.log("Approval successful:", approveTx);

      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Approval failed. Please try again.");
    } finally {
      setIsApproving(false);
    }
  };

  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex',
        gap: 2,
        flexDirection: isMdUp ? "row" : "column",
      }}>
        <Card sx={{
          flex: '1 1 60%',
          bgcolor: getColors().primary[900],
          color: getColors().grey[100],
          borderRadius: '16px'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 500, mb: 1, fontSize: '28px' }}>
              THAI Pre-sale
            </Typography>

            <Typography variant="h5" sx={{ mb: 3 }}>
              Wallet Balance: {isBalanceLoading
                ? "Loading..."
                : erc20Balance !== undefined
                  ? `${(Number(erc20Balance) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                  : "Connect Your wallet to see balance"}
            </Typography>

            {/* First Token Input: BUSD */}
            <TokenInput
              value={busdAmount}
              onChange={setBusdAmount}
              onMaxClick={() => setBusdAmount(Number(erc20Balance || 0n) / 1e18)}
              actionLabel="BUSD"
              onAction={handleApprove}
              disabled={true}
              isLoading={isApproving}
            />

            <Box sx={{ m: 2 }}>
              {thaiAmount
                ? "You will Receive THBCN approx..."
                : ""}
            </Box>
            
            {/* Second Token Input: THAI */}
            <TokenInput
              value={thaiAmount}
              disabled={true}
              isLoading={isApproving}
              actionLabel="THAI"
              onAction={handleApprove}
            />
            <LoadingButtonWrapper onClick={handleApprove} disabled={false}>
              Swap
            </LoadingButtonWrapper>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default StakingPage;
