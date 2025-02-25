import { useState, useEffect } from 'react';
import { Box, Container, Card, CardContent, Typography, useMediaQuery, useTheme, Button, Alert } from '@mui/material';
import { useActiveAccount, useSendTransaction, useReadContract } from "thirdweb/react";
import { config, usdtContract, dexContract, erc20contract } from '../../config';
import { prepareContractCall } from 'thirdweb';
import { getColors } from '../../layout/Theme/themes';
import { TokenInput } from '../../components/TokenInput/TokenInput';
import LoadingButtonWrapper from '../StakingPage/LoadingButtonWrapper';
import { useNavigate } from 'react-router-dom';
import SwapDialog from './SwapDialog';

const FIXED_EXCHANGE_RATE = 100; 

const StakingPage: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const [usdtAmount, setUsdtAmount] = useState<number>(0);
  const [thaiAmount, setThaiAmount] = useState<number>(0);
  const [openSwapDialog, setOpenSwapDialog] = useState(false);

  const handleSwapClick = () => {
    setOpenSwapDialog(true);
  };

  const handleSwapConfirm = async () => {
    setOpenSwapDialog(false);
    await handleSwap();
  };
  const { data: usdtBalance, isLoading: isBalanceLoading } = useReadContract({
    contract: usdtContract,
    method: "function balanceOf(address owner) returns (uint256)",
    params: [account?.address || "0x"],
  });
  const { data: erc20Balance } = useReadContract({
    contract: erc20contract,
    method: "function balanceOf(address owner) returns (uint256)",
    params: [account?.address || "0x"],
  });

  const { data: usdtSymbol } = useReadContract({
    contract: usdtContract,
    method: "function symbol() returns (string)",
    params: [],
  });
  const { data: erc20Symbol } = useReadContract({
    contract: erc20contract,
    method: "function symbol() returns (string)",
    params: [],
  });

  useEffect(() => {
    setThaiAmount(usdtAmount * FIXED_EXCHANGE_RATE);
  }, [usdtAmount]);

  const handleSwap = async (): Promise<void> => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (usdtAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const amountInWei = BigInt(Math.floor(usdtAmount * 1e18));

    if (usdtBalance === undefined || amountInWei > usdtBalance) {
      alert("Insufficient token balance.");
      return;
    }

    try {

      // Step 1: Approve the DEX contract to spend USDT
      const approveTx = prepareContractCall({
        contract: usdtContract,
        method: "function approve(address spender, uint256 amount)",
        params: [dexContract.address, BigInt("12300000000000000")],
      });
      await sendTransaction(approveTx);
      console.log("Approval successful");

      // Step 2: Swap USDT for THAI
      const swapTx = prepareContractCall({
        contract: dexContract,
        method: "function swapNow(address tokenIn, uint256 amountIn, address tokenOut, uint256 amountOut)",
        params: [usdtContract.address, amountInWei, erc20contract.address, BigInt(thaiAmount * 1e18)],
      });
      console.log(usdtContract.address, amountInWei, erc20contract.address, BigInt(thaiAmount * 1e18));

      await sendTransaction(swapTx);
      console.log("Swap successful", swapTx);

    } catch (error) {
      console.error("Swap failed:", error);
      alert("Swap failed. Please try again.");
    } finally {
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
              My Wallet Balance: {isBalanceLoading
                ? "Loading..."
                : erc20Balance !== undefined
                  ? `${(Number(erc20Balance) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                  : "Connect Your wallet to see balance"}
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
              My Wallet Balance: {isBalanceLoading
                ? "Loading..."
                : usdtBalance !== undefined
                  ? `${(Number(usdtBalance) / 1e18).toLocaleString()} ${usdtSymbol || 'BUSD'}`
                  : "Connect Your wallet to see balance"}
            </Typography>

            {/* First Token Input: BUSD */}
            <TokenInput
              value={usdtAmount}
              onChange={setUsdtAmount}
              onMaxClick={() => setUsdtAmount(Number(erc20Balance || 0n) / 1e18)}
              actionLabel="USDT"
              disabled={true}
            />

            <Box sx={{ m: 2 }}>
              {thaiAmount
                ? `You will Receive ${erc20Symbol} approx...`
                : ""}
            </Box>

            {/* Second Token Input: THAI */}
            <TokenInput
              value={thaiAmount}
              disabled={true}
              actionLabel="THAI"
            />
            <LoadingButtonWrapper onClick={handleSwap} disabled={false}>
            Review swap
            </LoadingButtonWrapper>
            <SwapDialog
        open={openSwapDialog}
        onClose={() => setOpenSwapDialog(false)}
        onConfirm={handleSwapConfirm}
        fromAmount={usdtAmount}
        toAmount={thaiAmount}
        fromSymbol={usdtSymbol || 'USDT'}
        toSymbol={erc20Symbol || 'THAI'}
        exchangeRate={FIXED_EXCHANGE_RATE}
      />

          </CardContent>
        </Card>
      </Box>
      <Alert sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
        position: 'relative'
      }}>
        Want To Earn More from {erc20Symbol}.
        <Button onClick={() => navigate("/staking")}>
          Stake Now
        </Button>
      </Alert>
    </Container>
  );
};

export default StakingPage;