import { useState, useEffect } from 'react';
import { Box, Container, Card, CardContent, Typography, useMediaQuery, useTheme, Button, Alert } from '@mui/material';
import { useActiveAccount, useSendTransaction, useReadContract, useWalletBalance } from "thirdweb/react";
import { defaultChain, dexContract, erc20contract } from '../../config';
import { prepareContractCall } from 'thirdweb';
import { getColors } from '../../layout/Theme/themes';
import { TokenInput } from '../../components/TokenInput/TokenInput';
import LoadingButtonWrapper from '../StakingPage/LoadingButtonWrapper';
import { useNavigate } from 'react-router-dom';
import SwapDialog from './SwapDialog';
import { toWei } from "thirdweb/utils";
import { client } from "../../client";
 
const FIXED_EXCHANGE_RATE = 100;

const StakingPage: React.FC = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const [userAmount, setUserAmount] = useState<number>(0);
  const [thaiAmount, setThaiAmount] = useState<number>(0);
  const [openSwapDialog, setOpenSwapDialog] = useState(false);

  const handleSwapClick = () => {
    setOpenSwapDialog(true);
  };

  const handleSwapConfirm = async () => {
    await handleSwap();
    // setOpenSwapDialog(false);
  };
  const { data:userBalance, isLoading:isUserBalanceLoading } = useWalletBalance({
    chain:defaultChain,
    address:account?.address,
    client,
  });

  const { data: erc20Balance } = useReadContract({
    contract: erc20contract,
    method: "function balanceOf(address owner) returns (uint256)",
    params: [account?.address || "0x"],
  });

  // const { data: usdtSymbol } = useReadContract({
  //   contract: usdtContract,
  //   method: "function symbol() returns (string)",
  //   params: [],
  // });
  const { data: erc20Symbol } = useReadContract({
    contract: erc20contract,
    method: "function symbol() returns (string)",
    params: [],
  });
  // const { data: approvedFromToken } = useReadContract({
  //   contract: usdtContract,
  //   method: "function allowance(address owner, address spender) view returns (uint256)",
  //   params: [account?.address || "0x", config.dexContractAddress],
  // });

  useEffect(() => {
    setThaiAmount(userAmount * FIXED_EXCHANGE_RATE);
  }, [userAmount]);

  // const handleApprove = async (): Promise<void> => {
  //   if (!account) {
  //     alert("Please connect your wallet first.");
  //     return;
  //   }

  //   if (userAmount <= 0) {
  //     alert("Amount must be greater than 0.");
  //     return;
  //   }

  //   const amountInWei = BigInt(Math.floor(userAmount * 1e18));

  //   // if (usdtBalance === undefined || amountInWei > usdtBalance) {
  //   //   alert("Insufficient token balance.");
  //   //   return;
  //   // }

  //   try {

  //     if (approvedFromToken && approvedFromToken >= amountInWei) {
  //       handleSwapClick()
  //     }
  //     else {
  //       const approveTx = prepareContractCall({
  //         contract: usdtContract,
  //         method: "function approve(address spender, uint256 amount)",
  //         params: [dexContract.address, amountInWei],
  //       });
  //       await sendTransaction(approveTx);
  //       console.log("Approval successful:", approveTx);
  //       handleSwapClick()
  //     }
  //   } catch (error) {
  //     console.error("Approval failed:", error);
  //     alert("Approval failed. Please try again.");
  //   } finally {
  //   }
  // };


  const handleApprove = async (): Promise<void> => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }  
    handleSwapClick()
    console.log("No need to approve");
    
  }
  const handleSwap = async (): Promise<void> => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (userAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const amountInWei = BigInt(Math.floor(userAmount * 1e18));

    if (userBalance === undefined || amountInWei > userBalance.value) {
      alert("Insufficient token balance.");
      return;
    }

    try {

      //  Swap USDT for THAI
      const swapTx = prepareContractCall({
        contract: dexContract,
        method: "function buyTokens( uint256 _presaleId, uint256 amount)",
        params: [BigInt(1),  BigInt(thaiAmount * 1e18)], // todo Update presaleId
        value: amountInWei,
      });

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
              My Wallet Balance: {isUserBalanceLoading
                ? "Loading..."
                : erc20Balance !== undefined
                  ? `${(Number(erc20Balance) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                  : "Connect Your wallet to see balance"}
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
              My Wallet Balance: {isUserBalanceLoading
                ? "Loading..."
                : userBalance !== undefined
                  ? `${(Number(userBalance.value) / 1e18).toLocaleString()} ${'POL'}`
                  : "Connect Your wallet to see balance"}
            </Typography>

            {/* First Token Input: BUSD */}
            <TokenInput
              value={userAmount}
              onChange={setUserAmount}
              onMaxClick={() => setUserAmount(Number(userBalance || 0n) / 1e18)}
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
            <LoadingButtonWrapper onClick={handleApprove} disabled={false}>
              Review swap
            </LoadingButtonWrapper>
            <SwapDialog
              open={openSwapDialog}
              onClose={() => setOpenSwapDialog(false)}
              onConfirm={handleSwapConfirm}
              approveToken={handleApprove}
              fromAmount={userAmount}
              toAmount={thaiAmount}
              fromSymbol={"POL"}
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