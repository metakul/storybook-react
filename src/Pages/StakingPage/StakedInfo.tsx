import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { stakingContract, erc20contract } from "../../config";
import { getColors } from '../../layout/Theme/themes';
import { prepareContractCall } from 'thirdweb';

// Helper function to safely format BigInt values
const formatBigInt = (value: bigint | undefined, decimals: number = 18): string => {
  if (!value) return "0";
  return (Number(value) / Math.pow(10, decimals)).toLocaleString();
};

interface StakeInfo {
  amount: bigint;
  startTime: bigint;
  duration: bigint;
  rewardsClaimed: boolean;
}

interface StakingDetails {
  0: bigint;  // totalLocked
  1: bigint;  // totalRewardsPending
  2: bigint;  // totalClaimedRewards
  3: StakeInfo[];  // stakes
}

const StakedInfo = () => {
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);

  const { data: stakingDetails, isLoading: isStakingDetailsLoading } = useReadContract({
    contract: stakingContract,
    method: "function getAllStakedInfo(address _user) view returns (uint256 totalLocked, uint256 totalRewardsPending, uint256 totalClaimedRewards, (uint256 amount, uint256 startTime, uint256 duration, bool rewardsClaimed)[] stakes)",
    params: [account?.address || "0x"],
  }) as { data: StakingDetails | undefined, isLoading: boolean };

  const { data: canWithdraw } = useReadContract({
    contract: stakingContract,
    method: "function canWithdraw(address) view returns (bool)",
    params: [account?.address || "0x"],
  });

  const { data: withdrawalPeriod } = useReadContract({
    contract: stakingContract,
    method: "function getWithdrawalPeriod(address) view returns (uint256)",
    params: [account?.address || "0x"],
  });

  const { data: erc20Symbol } = useReadContract({
    contract: erc20contract,
    method: "function symbol() returns (string)",
    params: [],
  });

  const handleWithdraw = async () => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (withdrawAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const amountInWei = BigInt(Math.floor(withdrawAmount * 1e18));

    if (!stakingDetails?.[0] || amountInWei > stakingDetails[0]) {
      alert("Insufficient staked balance.");
      return;
    }

    if (!canWithdraw) {
      const remainingTime = Number(withdrawalPeriod || 0);
      alert(`Cannot withdraw yet. Please wait ${remainingTime} more days.`);
      return;
    }

    try {
      setIsWithdrawing(true);
      const isEmergency = false;
      
      const withdrawTx = prepareContractCall({
        contract: stakingContract,
        method: isEmergency ? 
          "function emergencyWithdraw()" :
          "function withdraw(uint256 _amount)",
        params: isEmergency ? [] : [amountInWei],
      });

      await sendTransaction(withdrawTx);
      setWithdrawAmount(0);
      alert("Withdrawal successful!");

    } catch (error: any) {
      console.error("Withdrawal failed:", error);
      let errorMessage = "Withdrawal failed. Please try again.";
      
      if (error.message?.includes("lock period")) {
        errorMessage = "Cannot withdraw: Lock period not ended.";
      } else if (error.message?.includes("insufficient balance")) {
        errorMessage = "Insufficient staked balance.";
      }
      
      alert(errorMessage);
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (isStakingDetailsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!stakingDetails || stakingDetails[3].length === 0) {
    return (
      <Box sx={{ mt: 4, color: 'rgba(148, 163, 184, 1)' }}>
        <Typography>No staking details found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      {/* Overview Card */}
      <Card sx={{
        bgcolor: getColors().primary[900],
        color: 'white',
        borderRadius: '16px',
        mb: 4
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{
            fontWeight: 500,
            mb: 3,
            fontSize: '28px'
          }}>
            Staking Overview
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: 4
          }}>
            <Box>
              <Typography variant="h4" sx={{
                color: getColors().primary[500],
                mb: 1,
                fontWeight: 'bold',
                fontSize: '32px'
              }}>
                {formatBigInt(stakingDetails[0])}
              </Typography>
              <Typography sx={{ color: 'rgba(148, 163, 184, 1)' }}>
                Total Tokens Locked
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{
                color: getColors().primary[500],
                mb: 1,
                fontWeight: 'bold',
                fontSize: '32px'
              }}>
                {formatBigInt(stakingDetails[1])}
              </Typography>
              <Typography sx={{ color: 'rgba(148, 163, 184, 1)' }}>
                Pending Rewards
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{
                color: getColors().primary[500],
                mb: 1,
                fontWeight: 'bold',
                fontSize: '32px'
              }}>
                {formatBigInt(stakingDetails[2])}
              </Typography>
              <Typography sx={{ color: 'rgba(148, 163, 184, 1)' }}>
                Total Claimed Rewards
              </Typography>
            </Box>
          </Box>

          {/* Withdrawal Section */}
          <Box sx={{
            mt: 4,
            p: 3,
            border: '1px solid rgba(30, 41, 59, 0.3)',
            borderRadius: '8px',
            bgcolor: 'rgba(15, 23, 42, 0.3)'
          }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Withdraw Staked Tokens
            </Typography>
            
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
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
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (!isNaN(value) && value >= 0) {
                      setWithdrawAmount(value);
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    width: '100%',
                    outline: 'none',
                    fontSize: '16px'
                  }}
                  placeholder="Enter amount to withdraw"
                  min="0"
                  step="0.000001"
                />
                <Button
                  sx={{
                    color: 'white',
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 41, 59, 0.3)'
                    }
                  }}
                  onClick={() => stakingDetails && setWithdrawAmount(Number(stakingDetails[0]) / 1e18)}
                  disabled={!stakingDetails || isStakingDetailsLoading}
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
                  '&:disabled': {
                    bgcolor: 'rgba(79, 70, 229, 0.6)',
                    color: 'white'
                  },
                  textTransform: 'none',
                  fontWeight: 'medium',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  letterSpacing: '0.025em',
                  transition: 'all 0.2s ease-in-out'
                }}
                onClick={handleWithdraw}
                disabled={
                  !account || 
                  withdrawAmount <= 0 || 
                  isWithdrawing || 
                  isStakingDetailsLoading || 
                  !stakingDetails || 
                  !canWithdraw
                }
              >
                {isWithdrawing ? "Withdrawing..." : "Withdraw"}
              </Button>
            </Box>

            {/* Additional Info */}
            <Box sx={{ color: 'rgba(148, 163, 184, 1)', fontSize: '14px', mt: 2 }}>
              <Typography component="div" sx={{ mb: 1 }}>
                Available to withdraw: {isStakingDetailsLoading
                  ? "Loading..."
                  : stakingDetails
                    ? `${formatBigInt(stakingDetails[0])} ${erc20Symbol || 'BUSD'}`
                    : "Connect your wallet"}
              </Typography>
              
              {!canWithdraw && withdrawalPeriod && (
                <Typography component="div" sx={{ color: '#ef4444' }}>
                  Withdrawal available in: {Number(withdrawalPeriod)} days
                </Typography>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Active Stakes Section */}
      <Typography variant="h4" sx={{
        color: 'white',
        mb: 3,
        fontWeight: 500,
        fontSize: '28px'
      }}>
        Active Stakes
      </Typography>
      
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: '1fr 1fr',
          lg: '1fr 1fr 1fr'
        },
        gap: 2
      }}>
        {stakingDetails[3].map((stake, index) => {
          const stakingStartDate = new Date(Number(stake.startTime) * 1000).toLocaleDateString();
          const stakingPeriodInDays = Number(stake.duration) / 86400;
          
          return (
            <Card key={index} sx={{
              bgcolor: getColors().primary[900],
              color: 'white',
              borderRadius: '16px'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h6">
                    Stake #{index + 1}
                  </Typography>
                  <Box sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: '20px',
                    bgcolor: stake.rewardsClaimed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                    color: stake.rewardsClaimed ? 'rgb(134, 239, 172)' : 'rgb(253, 224, 71)',
                    fontSize: '0.875rem'
                  }}>
                    {stake.rewardsClaimed ? 'Rewards Claimed' : 'Rewards Pending'}
                  </Box>
                </Box>
                
                <Box sx={{ color: 'rgba(148, 163, 184, 1)' }}>
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}>
                    <Typography>Amount Staked:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      {formatBigInt(stake.amount)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}>
                    <Typography>Start Date:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      {stakingStartDate}
                    </Typography>
                  </Box>
                  
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}>
                    <Typography>Duration:</Typography>
                    <Typography sx={{ color: 'white', fontWeight: 500 }}>
                      {stakingPeriodInDays} Days
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default StakedInfo;