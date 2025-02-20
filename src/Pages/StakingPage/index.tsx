import { useState } from 'react';
import { Box, Container, Card, CardContent, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useActiveAccount, useSendTransaction, useReadContract } from "thirdweb/react";
import { config, erc20contract, stakingContract } from '../../config';
import { prepareContractCall } from 'thirdweb';
import { getColors } from '../../layout/Theme/themes';
import StakedInfo from './StakedInfo';

const StakingPage = () => {
  const theme = useTheme();
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  const [stakeAmount, setStakeAmount] = useState(0);
  const [approvalAmount, setApprovalAmount] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(30);
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
  const { data: erc20ApprovedToken, isLoading: isApprovedTokenLoading } = useReadContract({
    contract: erc20contract,
    method: "function allowance(address owner, address spender) view returns (uint256)",
    params: [account?.address || "0x", config.stakeContractAddress],
  });


  // Fetch total value locked
  const { data: totalValueLocked } = useReadContract({
    contract: stakingContract,
    method: "function getTotalValueLocked() returns (uint256)",
    params: [],
  });
  // Fetch total value locked for 7 days
  const { data: userLockedAmount, isLoading: isLockedBalanceLoading } = useReadContract({
    contract: stakingContract,
    method: "function getLockedAmount(address) view returns (uint256 lockedAmount)",
    params: [account?.address || "0x"],
  });
  const { data: userEarnedAmount, isLoading: isEarnedBalanceLoading } = useReadContract({
    contract: stakingContract,
    method: "function getClaimableRewards(address) view returns (uint256 earnedAmount)",
    params: [account?.address || "0x"],
  });
  const { data: maxAndTotalStakeInfo, isLoading: isMAxAndTotalSupplyLoading } = useReadContract({
    contract: stakingContract,
    method:  "function getMaxStakeInfo(uint256 _duration) view returns (uint256 maxStake, uint256 totalStake)",
    params: [BigInt(selectedDuration)],
  });
  



  // Fetch stakers count
  const { data: stakersCount } = useReadContract({
    contract: stakingContract,
    method: "function getStakersCount() returns (uint256)",
    params: [],
  });

  const stakingDurations = [
    { value: 30, label: '30 Days', apy: 15, lockedAmount:userLockedAmount,rewardsEarned :userEarnedAmount},
    { value: 90, label: '90 Days', apy: 25, lockedAmount:userLockedAmount,rewardsEarned:userEarnedAmount },
    { value: 180, label: '180 Days', apy: 25, lockedAmount:userLockedAmount,rewardsEarned:userEarnedAmount },
    { value: 360, label: '360 Days', apy: 30, lockedAmount:userLockedAmount, rewardsEarned :userEarnedAmount}
  ];

  const selectedAPY = stakingDurations.find(d => d.value === selectedDuration)?.apy || 0;
  const selectedLockedAmount = stakingDurations.find(d => d.value === selectedDuration)?.lockedAmount || 0;
  const selectedEarnedAmount = stakingDurations.find(d => d.value === selectedDuration)?.rewardsEarned || 0;

  const { data: currentAPY } = useReadContract({
    contract: stakingContract,
    method: "function getCurrentAPY() returns (uint256)",
    params: [],
  });
  const handleApprove = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (approvalAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    // Convert amount to token decimals (assuming 18 decimals)
    const amountInWei = BigInt(approvalAmount * 1e18);

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

    } catch (error) {
      console.error("Approval failed:", error);
      alert("Approval failed. Please try again.");
    }
  };
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
      // Step 1: Stake the tokens
      const stakeTx = prepareContractCall({
        contract: stakingContract,
        method: "function stake(uint256 _amount, uint256 _duration)",
        params: [amountInWei, BigInt(selectedDuration)],
      });
      console.log(stakeTx);
      
      await sendTransaction(stakeTx);

    } catch (error) {
      console.error("Staking failed:", error);
      alert("Staking failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex', gap: 2,
        flexDirection: isMdUp ? "row" : "column",
      }}>
        {/* Main Staking Card */}
        <Card sx={{
          flex: '1 1 60%',
          bgcolor: getColors().primary[900],
          color: getColors().grey[100],
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
            <Typography variant="h5" sx={{ mb: 3,  }}>
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
                <Typography>Max Staking Threshhold:</Typography>
                {isMAxAndTotalSupplyLoading
                    ? "..."
                
                      : maxAndTotalStakeInfo !== undefined
                        ? `${(Number(maxAndTotalStakeInfo[0]) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                        : "Loading..."
                      }
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Total Staking Reached:</Typography>
                {isMAxAndTotalSupplyLoading
                    ? "..."
                
                      : maxAndTotalStakeInfo !== undefined
                        ? `${(Number(maxAndTotalStakeInfo[1]) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                        : "Loading..."
                      }
              </Box>
           
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Your Locked Amount:</Typography>
                <Typography>
                  {isLockedBalanceLoading
                    ? "..."
                    : selectedLockedAmount !== undefined
                      ? `${(Number(selectedLockedAmount) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                      : "Conenct Your wallet to see balance"}
                </Typography>

              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Your Unlocked Account:</Typography>
                <Typography>
                  {isBalanceLoading
                    ? "..."
                    : erc20Balance !== undefined
                      ? `${(Number(erc20Balance) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                      : "Conenct Your wallet to see balance"}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Your Pending Rewards:</Typography>
                <Typography>
                  {isEarnedBalanceLoading
                    ? "..."
                    : selectedEarnedAmount !== undefined
                      ? `${(Number(selectedEarnedAmount) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                      : "Conenct Your wallet to see balance"}
                </Typography>
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
                fontWeight: 'bold',
                color: getColors().primary[500]
              }}>
                {selectedAPY}%
              </Typography>
              <Typography sx={{
                color: 'rgba(148, 163, 184, 1)',
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
                  value={approvalAmount}
                  onChange={(e) => setApprovalAmount(parseFloat(e.target.value) || 0)}
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
                  onClick={() => setApprovalAmount(Number(erc20Balance) / 1e18)}
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
                onClick={handleApprove}
                disabled={!account || approvalAmount <= 0 || isBalanceLoading}
              >
                Approve
              </Button>
            </Box>

            <Box>
              {isApprovedTokenLoading
                ? "..."
                : erc20ApprovedToken !== undefined
                  ? `  Total Approved Tokens:  ${(Number(erc20ApprovedToken) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                  : "Conenct Your wallet to see balance"}
            </Box>
            {/* Withdraw Input Field + Withdraw Button - Side by side */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              mt: 3
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
                  
                  onClick={() => setStakeAmount(Number(erc20ApprovedToken) / 1e18)}
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
                disabled={!account || stakeAmount <= 0 || isBalanceLoading}
                onClick={handleStake}
              >
                Stake
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
            bgcolor: getColors().primary[900],
            color: 'white',
            borderRadius: '16px',
            height: '150px'  // Adjust the height to match the image
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{
                mb: 2,
                color: getColors().grey[100],
                fontWeight: 'bold',
                fontSize: '32px'  // Larger font size for the value
              }}>
                ${(Number(totalValueLocked || 0) / 1e18).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </Typography>
              <Typography sx={{
                color: 'rgba(148, 163, 184, 1)',
                fontSize: '16px',
                mt: 1
              }}>
                Total {erc20Symbol} Locked
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            bgcolor: getColors().primary[900],
            color: 'white',
            borderRadius: '16px',
            height: '150px'  // Adjust the height to match the image
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{
                color: getColors().grey[100],

                mb: 2,
                fontWeight: 'bold',
                fontSize: '32px'  // Larger font size for the value
              }}>
                {parseFloat(currentAPY ? (Number(currentAPY) / 100).toFixed(2) : '30')}%
              </Typography>
              <Typography sx={{
                color: 'rgba(148, 163, 184, 1)',
                fontSize: '16px',
                mt: 1
              }}>
                Max APY
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{
            bgcolor: getColors().primary[900],
            color: 'white',
            borderRadius: '16px',
            height: '150px'  // Adjust the height to match the image
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{
                color: getColors().grey[100],
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