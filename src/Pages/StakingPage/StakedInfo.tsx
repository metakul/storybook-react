import { useState } from 'react';
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
  earned: bigint
  claimedRewards: bigint
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
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);

  const { data: stakingDetails, isLoading: isStakingDetailsLoading } = useReadContract({
    contract: stakingContract,
    method: "function getAllStakedInfo(address _user) view returns (uint256 totalLocked, uint256 totalRewardsPending, uint256 totalClaimedRewards, (uint256 amount, uint256 startTime, uint256 duration, uint256 earned, uint256 claimedRewards, bool rewardsClaimed)[] stakes)",
    params: [account?.address || "0x"],
  }) as { data: StakingDetails | undefined, isLoading: boolean };

  const { data: erc20Symbol } = useReadContract({
    contract: erc20contract,
    method: "function symbol() returns (string)",
    params: [],
  });

  const handleWithdraw = async (stakeId: string | number | bigint | boolean) => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setIsWithdrawing(true);

      const withdrawTx = prepareContractCall({
        contract: stakingContract,
        method: "function withdrawAndClaim(uint256 _stakeId)",
        params: [BigInt(stakeId)],
      });

      await sendTransaction(withdrawTx);

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
      <Box sx={{ justifyContent: 'center', mt: 4 }}>
        {/* Active Stakes Section */}
        <Typography variant="h4" sx={{
          color: getColors().grey[200],
          mb: 3,
          fontWeight: 600,
          fontSize: '32px'
        }}>
          My Active Stakes
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  if (!stakingDetails || stakingDetails[3].length === 0) {
    return (
      <Box sx={{ mt: 4, color: 'rgba(148, 163, 184, 1)' }}>
        {/* Active Stakes Section */}
        <Typography variant="h4" sx={{
          color: getColors().grey[200],
          mb: 3,
          fontWeight: 600,
          fontSize: '32px'
        }}>
          My Active Stakes
        </Typography>
        <Typography>No staking details found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>

      {/* Active Stakes Section */}
      <Typography variant="h4" sx={{
        color: getColors().grey[200],
        mb: 3,
        fontWeight: 600,
        fontSize: '32px'
      }}>
        My Active Stakes
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
          const stakingStartDate = new Date(Number(stake.startTime) * 1000);
          const stakingPeriodInDays = Number(stake.duration) / 86400;
          const stakingEndDate = new Date(stakingStartDate.getTime() + stakingPeriodInDays * 24 * 60 * 60 * 1000);
          const formattedEndDate = stakingEndDate.toLocaleDateString();

          return (
            <Card key={index} sx={{
              bgcolor: getColors().primary[900],
              color: getColors().grey[100],
              borderRadius: '16px'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h6" sx={{
                    color: getColors().secondary[300],
                  }}>
                    Stake #{index + 1}
                  </Typography>
                  <Box sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: '20px',
                    bgcolor: stake.rewardsClaimed ? getColors().redAccent[800] : getColors().greenAccent[800],
                    color: stake.rewardsClaimed ? getColors().redAccent[200] : getColors().grey[100],
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
                    <Typography sx={{ color: getColors().grey[100], fontWeight: 500 }}>
                      {formatBigInt(stake.amount)} {erc20Symbol}
                    </Typography>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}>
                    <Typography>Start Date:</Typography>
                    <Typography sx={{ color: getColors().grey[100], fontWeight: 500 }}>
                      {stakingStartDate.toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}>
                    <Typography>Duration:</Typography>
                    <Typography sx={{ color: getColors().grey[100], fontWeight: 500 }}>
                      {stakingPeriodInDays.toString()} Days
                    </Typography>
                  </Box>
                  {!stake.rewardsClaimed &&
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}>
                    <Typography>End Date:</Typography>
                    <Typography sx={{ color: getColors().grey[100], fontWeight: 500 }}>
                      {formattedEndDate}
                    </Typography>
                  </Box>
        }

                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1.5
                  }}>
                    {!stake.rewardsClaimed ? (
                      <>
                        <Typography>Earned Rewards:</Typography>
                        <Typography sx={{ color: getColors().grey[100], fontWeight: 500 }}>
                          {formatBigInt(stake.earned)} {erc20Symbol}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography>Claimed Rewards:</Typography>
                        <Typography sx={{ color: getColors().grey[100], fontWeight: 500 }}>
                          {formatBigInt(stake.claimedRewards)} {erc20Symbol}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
                <Box>
                  {!stake.rewardsClaimed &&
                    <Button
                      sx={{
                        flex: 1,
                        width: '100%',
                        bgcolor: getColors().greenAccent[800],
                        color: getColors().grey[100],
                        py: 1.5,
                        borderRadius: '8px',
                        '&:hover': {
                          bgcolor: '#4338ca'
                        },
                        '&:disabled': {
                          bgcolor: getColors().grey[100],
                          color: getColors().grey[100]
                        },
                        textTransform: 'none',
                        fontWeight: 'medium',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        letterSpacing: '0.025em',
                        transition: 'all 0.2s ease-in-out'
                      }}
                      onClick={() => handleWithdraw(index)}
                      disabled={!account}
                    >
                      {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                    </Button>
                  }
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