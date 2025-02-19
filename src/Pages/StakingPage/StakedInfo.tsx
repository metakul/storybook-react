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