import { useState } from 'react';
import { Box, Container, Card, CardContent, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useActiveAccount, useSendTransaction, useReadContract } from "thirdweb/react";
import { erc20contract, stakingContract } from '../../config';
import { prepareContractCall } from 'thirdweb';
import StakedInfo from './StakedInfo';

const StakingPage = () => {
  const theme = useTheme();
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  const [stakeAmount, setStakeAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(7);
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));


  // Fetch ERC20 token balance
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

  // Fetch total value locked
  const { data: totalValueLocked } = useReadContract({
    contract: stakingContract,
    method: "function getTotalValueLocked() returns (uint256)",
    params: [],
  });

  // Fetch stakers count
  const { data: stakersCount } = useReadContract({
    contract: stakingContract,
    method: "function getStakersCount() returns (uint256)",
    params: [],
  });

  const stakingDurations = [
    { value: 7, label: '07 Days' },
    { value: 14, label: '14 Days' },
    { value: 30, label: '30 Days' },
    { value: 60, label: '60 Days' }
  ];
  const { data: currentAPY } = useReadContract({
    contract: stakingContract,
    method: "function getCurrentAPY() returns (uint256)",
    params: [],
  });
  const handleStake = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (stakeAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    // Convert amount to token decimals (assuming 18 decimals)
    const amountInWei = BigInt(stakeAmount * 1e18);

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
        params: [amountInWei, BigInt(selectedDuration * 86400)],
      });
      await sendTransaction(stakeTx);

    } catch (error) {
      console.error("Staking failed:", error);
      alert("Staking failed. Please try again.");
    }
  };

  const handleWithdraw = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const withdrawTx = prepareContractCall({
        contract: stakingContract,
        method: "function withdraw()",
        params: [],
      });
      await sendTransaction(withdrawTx);
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Withdrawal failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, 
         flexDirection: isMdUp ? "row" : "column",
       }}>
        {/* Main Staking Card */}
        <Card sx={{ 
          flex: '1 1 60%',
          bgcolor: '#0e1016', 
          color: 'white',
          borderRadius: '16px'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 500,
              mb: 1,
              fontSize: '28px'
            }}>
              Participate IGO Stake
            </Typography>
            <Typography variant="h5" sx={{ mb: 3, color: '#fff' }}>
              Wallet Balance: {isBalanceLoading
                ? "Loading..."
                : erc20Balance !== undefined
                ? `${(Number(erc20Balance) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                : "Conenct Your wallet to see balance"}
            </Typography>

                      {/* Duration Selector - Styled to match the image exactly */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                {stakingDurations.map((duration) => (
                  <Button
                    key={duration.value}
                    sx={{
                      bgcolor: selectedDuration === duration.value 
                        ? '#4f46e5' 
                        : 'rgba(15, 23, 42, 0.6)',
                      color: 'white',
                      '&:hover': {
                        bgcolor: selectedDuration === duration.value 
                          ? '#4338ca' 
                          : 'rgba(30, 41, 59, 0.8)'
                      },
                      textTransform: 'none',
                      borderRadius: '8px',
                      py: 1,
                      px: 3,
                      border: selectedDuration === duration.value 
                        ? 'none' 
                        : '1px solid rgba(30, 41, 59, 0.3)',
                      boxShadow: selectedDuration === duration.value 
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        : 'inset 0 2px 5px rgba(0, 0, 0, 0.2)',
                      fontWeight: selectedDuration === duration.value ? 'medium' : 'normal',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onClick={() => setSelectedDuration(duration.value)}
                  >
                    {duration.label}
                  </Button>
                ))}
              </Box>

            {/* Staking Info */}
            <Box sx={{ mb: 4, color: 'rgba(148, 163, 184, 1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Lock period:</Typography>
                <Typography>{selectedDuration} Days</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Extends lock on registration:</Typography>
                <Typography>Yes</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Early unstake fee:</Typography>
                <Typography>30%</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Status:</Typography>
                <Typography>Unlocked</Typography>
              </Box>
            </Box>

            {/* APY Display - Styled as in image */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 4,
              position: 'relative'
            }}>
              <Typography sx={{ 
                fontSize: '48px',
                fontWeight: 'bold'
              }}>
                0%
              </Typography>
              <Typography sx={{ 
                color: 'rgba(148, 163, 184, 1)',
                position: 'absolute',
                right: 0,
                top: 0
              }}>
                APY*
              </Typography>
            </Box>

            {/* Stake Input Field + Approve Button - Side by side */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              mb: 2,
            }}>
              <Box sx={{ 
                flex: 3,
                p: 2,
                border: '1px solid rgba(30, 41, 59, 0.3)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)'
              }}>
                <input
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(parseFloat(e.target.value) || 0)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    width: '100%',
                    outline: 'none',
                    fontSize: '16px'
                  }}
                  placeholder="0"
                />
                <Button 
                  sx={{ 
                    color: 'white',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 41, 59, 0.3)'
                    }
                  }}
                  onClick={() => setStakeAmount(Number(erc20Balance) / 1e18)}
                >
                  Max
                </Button>
              </Box>
              <Button
                sx={{
                  flex: 1,
                  bgcolor: '#4f46e5',
                  color: 'white',
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    bgcolor: '#4338ca'
                  },
                  textTransform: 'none',
                  '&:disabled': {
                    bgcolor: 'rgba(79, 70, 229, 0.6)',
                    color: 'white'
                  },
                  fontWeight: 'medium',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  letterSpacing: '0.025em',
                  transition: 'all 0.2s ease-in-out'
                }}
                onClick={handleStake}
                disabled={!account || stakeAmount <= 0 || isBalanceLoading}
              >
                Approve
              </Button>
            </Box>

            {/* Withdraw Input Field + Withdraw Button - Side by side */}
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              mb: 3,
            }}>
              <Box sx={{ 
                flex: 3,
                p: 2,
                border: '1px solid rgba(30, 41, 59, 0.3)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)'
              }}>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(parseFloat(e.target.value) || 0)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    width: '100%',
                    outline: 'none',
                    fontSize: '16px'
                  }}
                  placeholder="0"
                />
                <Button 
                  sx={{ 
                    color: 'white',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 41, 59, 0.3)'
                    }
                  }}
                  onClick={() => setWithdrawAmount(Number(erc20Balance) / 1e18)}
                >
                  Max
                </Button>
              </Box>
              <Button
                sx={{
                  flex: 1,
                  bgcolor: '#4f46e5',
                  color: 'white',
                  py: 1.5,
                  borderRadius: '8px',
                  '&:hover': {
                    bgcolor: '#4338ca'
                  },
                  textTransform: 'none',
                  fontWeight: 'medium',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  letterSpacing: '0.025em',
                  transition: 'all 0.2s ease-in-out'
                }}
                onClick={handleWithdraw}
                disabled={!account}
              >
                Withdraw
              </Button>
            </Box>
            <Typography sx={{ 
              color: 'rgba(148, 163, 184, 1)',
              fontSize: '14px',
              mb: 1,
              lineHeight: 1.5
            }}>
              Once staked, you need to register for every IDO, so we can calculate 
              the guaranteed allocation. Once registered, we lock your tokens, but 
              you still can participate in other IDOs.
            </Typography>
            
            <Typography sx={{ 
              color: 'rgba(148, 163, 184, 1)',
              fontSize: '14px'
            }}>
              *APY is dynamic.
            </Typography>
          </CardContent>
        </Card>

        {/* Stats Cards - Vertical Stack - Styled to match image */}
{/* Stats Cards - Vertical Stack - Styled to match image */}
<Box sx={{ 
  display: 'flex', 
  flexDirection: 'column',
  gap: 2,
  flex: '1 1 38%'
}}>
  <Card sx={{ 
    bgcolor: '#0e1016', 
    color: 'white',
    borderRadius: '16px',
    height: '150px'  // Adjust the height to match the image
  }}>
    <CardContent sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ 
        mb: 2, 
        fontWeight: 'bold',
        fontSize: '32px'  // Larger font size for the value
      }}>
        ${Number(totalValueLocked || 0).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </Typography>
      <Typography sx={{ 
        color: 'rgba(148, 163, 184, 1)',
        fontSize: '16px',
        mt: 1
      }}>
        Total Value Locked
      </Typography>
    </CardContent>
  </Card>

  <Card sx={{ 
    bgcolor: '#0e1016', 
    color: 'white',
    borderRadius: '16px',
    height: '150px'  // Adjust the height to match the image
  }}>
    <CardContent sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ 
        mb: 2, 
        fontWeight: 'bold',
        fontSize: '32px'  // Larger font size for the value
      }}>
{parseFloat(currentAPY ? (Number(currentAPY) / 100).toFixed(2) : '97.23')}%
</Typography>
      <Typography sx={{ 
        color: 'rgba(148, 163, 184, 1)',
        fontSize: '16px',
        mt: 1
      }}>
        APY
      </Typography>
    </CardContent>
  </Card>

  <Card sx={{ 
    bgcolor: '#0e1016', 
    color: 'white',
    borderRadius: '16px',
    height: '150px'  // Adjust the height to match the image
  }}>
    <CardContent sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ 
        mb: 2, 
        fontWeight: 'bold',
        fontSize: '32px'  // Larger font size for the value
      }}>
        {Number(stakersCount || 0).toLocaleString()}
      </Typography>
      <Typography sx={{ 
        color: 'rgba(148, 163, 184, 1)',
        fontSize: '16px',
        mt: 1
      }}>
        Number of Stakers
      </Typography>
    </CardContent>
  </Card>
</Box>
      </Box>
      
      <StakedInfo />
    </Container>
  );
};

export default StakingPage;