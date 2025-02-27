import { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';
import { useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { stakingContract, erc20contract } from "../../config";
import { getColors } from '../../layout/Theme/themes';
import { prepareContractCall } from 'thirdweb';
import LoadingButtonWrapper from './LoadingButtonWrapper';

interface StakeDetailRowProps {
  label: string;
  value: string;
}

interface StakeInfo {
  amount: bigint;
  startTime: bigint;
  duration: bigint;
  rewardsClaimed: boolean;
  earned: bigint;
  claimedRewards: bigint;
}

interface StakingDetails {
  0: bigint;  // totalLocked
  1: bigint;  // totalRewardsPending
  2: bigint;  // totalClaimedRewards
  3: StakeInfo[];  // stakes
}

interface ToastProps {
  message: string;
  type: 'warning' | 'success' | 'error';
  onConfirm?: () => void;
  onCancel?: () => void;
  isVisible: boolean;
}

// Toast Component
const Toast: React.FC<ToastProps> = ({ message, type, onConfirm, onCancel, isVisible }) => {
  if (!isVisible) return null;

  const colors = getColors();

  const getBackgroundColor = () => {
    switch (type) {
      case 'warning':
        return colors.secondary[500];
      case 'success':
        return colors.greenAccent[500];
      case 'error':
        return colors.redAccent[500];
      default:
        return colors.primary[500];
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        minWidth: '300px',
        maxWidth: '400px',
        backgroundColor: getBackgroundColor(),
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        animation: 'slideIn 0.3s ease-out',
        '@keyframes slideIn': {
          from: {
            transform: 'translateX(100%)',
            opacity: 0,
          },
          to: {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: colors.grey[100], mb: onConfirm ? 2 : 0 }}>
          {message}
        </Typography>

        {(onConfirm || onCancel) && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
            mt: 2
          }}>
            {onCancel && (
              <Button
                onClick={onCancel}
                sx={{
                  backgroundColor: colors.grey[700],
                  color: colors.grey[100],
                  '&:hover': {
                    backgroundColor: colors.grey[600],
                  },
                }}
              >
                Cancel
              </Button>
            )}
            {onConfirm && (
              <Button
                onClick={onConfirm}
                sx={{
                  backgroundColor: colors.grey[900],
                  color: colors.grey[100],
                  '&:hover': {
                    backgroundColor: colors.grey[800],
                  },
                }}
              >
                Confirm
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

// Utility function
const formatBigInt = (value: bigint | undefined, decimals: number = 18): string => {
  if (!value) return "0";
  return (Number(value) / Math.pow(10, decimals)).toLocaleString();
};

// StakeDetailRow component
const StakeDetailRow: React.FC<StakeDetailRowProps> = ({ label, value }) => (
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-between',
    mb: 1.5,
    flexWrap: 'wrap'
  }}>
    <Typography>{label}:</Typography>
    <Typography sx={{
      color: getColors().grey[100],
      fontWeight: 500,
      ml: 2
    }}>
      {value}
    </Typography>
  </Box>
);

// Main component
const StakedInfo: React.FC = () => {
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();
  const [toast, setToast] = useState<{
    message: string;
    type: 'warning' | 'success' | 'error';
    isVisible: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
  }>({
    message: '',
    type: 'warning',
    isVisible: false,
  });

  const showToast = (
    message: string,
    type: 'warning' | 'success' | 'error',
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    setToast({ message, type, isVisible: true, onConfirm, onCancel });

    if (type === 'success') {
      setTimeout(() => {
        hideToast();
      }, 5000);
    }
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        if (!toast.onConfirm && !toast.onCancel) {
          hideToast();
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast.isVisible]);

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

  const processWithdrawal = async (stakeId: number) => {
    try {

      const withdrawTx = prepareContractCall({
        contract: stakingContract,
        method: "function withdrawAndClaim(uint256 _stakeId)",
        params: [BigInt(stakeId)],
      });

      await sendTransaction(withdrawTx);
      showToast("Withdrawal successful!", "success");

    } catch (error: any) {
      console.error("Withdrawal failed:", error);
      let errorMessage = "Withdrawal failed. Please try again.";

      if (error.message?.includes("lock period")) {
        errorMessage = "Cannot withdraw: Lock period not ended.";
      } else if (error.message?.includes("insufficient balance")) {
        errorMessage = "Insufficient staked balance.";
      }

      showToast(errorMessage, "error");
    } finally {
    }
  };

  const handleWithdraw = async (stakeId: number, startTime: bigint, duration: bigint) => {
    if (!account) {
      showToast("Please connect your wallet first.", "error");
      return;
    }

    const currentTime = BigInt(Math.floor(Date.now() / 1000));
    const endTime = startTime + duration;

    if (currentTime < endTime) {
      showToast(
        "Warning: Early withdrawal will result in a 50% penalty on your rewards. Do you wish to continue?",
        "warning",
        () => processWithdrawal(stakeId),
        () => {
          hideToast();
        }
      );
      return;
    }

    await processWithdrawal(stakeId);
  };


  if (isStakingDetailsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!stakingDetails || stakingDetails[3].length === 0) {
    return (
      <Box sx={{
        p: { xs: 2, sm: 4 },
        color: 'rgba(148, 163, 184, 1)'
      }}>
        <Typography variant="h4" sx={{
          color: getColors().grey[200],
          mb: 3,
          fontWeight: 600,
          fontSize: { xs: '24px', sm: '32px' }
        }}>
          My Active Stakes
        </Typography>
        <Typography>No staking details found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      p: { xs: 2, sm: 4 }
    }}>
      <Toast {...toast} />

      <Typography variant="h4" sx={{
        color: getColors().grey[200],
        mb: 3,
        fontWeight: 600,
        fontSize: { xs: '24px', sm: '32px' }
      }}>
        My Active Stakes
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          lg: '1fr 1fr 1fr'
        },
        gap: { xs: 2, sm: 3 }
      }}>
        {stakingDetails[3].map((stake, index) => {
          const stakingStartDate = new Date(Number(stake.startTime) * 1000);
          const stakingPeriodInDays = Number(stake.duration) / 86400;
          const stakingEndDate = new Date(stakingStartDate.getTime() + stakingPeriodInDays * 24 * 60 * 60 * 1000);
          const formattedEndDate = stakingEndDate.toLocaleDateString();

          return (
            <Card key={index} sx={{
              borderRadius: '16px',
              backgroundColor: getColors().yellowAccent[300],

            }}>
              <CardContent sx={{
                p: { xs: 2, sm: 4 }
              }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 2, sm: 0 }
                }}>
                  <Typography variant="h6" sx={{
                    color: getColors().secondary[400],
                  }}>
                    Stake #{index + 1}
                  </Typography>
                  <Box sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: '20px',
                    bgcolor: stake.rewardsClaimed ? getColors().redAccent[800] : getColors().greenAccent[800],
                    color: stake.rewardsClaimed ? getColors().redAccent[200] : getColors().grey[100],
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    width: { xs: '100%', sm: 'auto' }
                  }}>
                    {stake.rewardsClaimed ? 'Rewards Claimed' : 'Rewards Pending'}
                  </Box>
                </Box>

                <Box sx={{color: getColors().primary[100],

                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}>
                  <StakeDetailRow
                    label="Amount Staked"
                    value={`${formatBigInt(stake.amount)} ${erc20Symbol}`}
                  />
                  <StakeDetailRow
                    label="Start Date"
                    value={stakingStartDate.toLocaleDateString()}
                  />
                  <StakeDetailRow
                    label="Duration"
                    value={`${stakingPeriodInDays.toString()} Days`}
                  />
                  {!stake.rewardsClaimed && (
                    <StakeDetailRow
                      label="End Date"
                      value={formattedEndDate}
                    />
                  )}
                  <StakeDetailRow
                    label={stake.rewardsClaimed ? "Claimed Rewards" : "Earned Rewards"}
                    value={`${formatBigInt(stake.rewardsClaimed ? stake.claimedRewards : stake.earned)} ${erc20Symbol}`}
                  />
                </Box>

                {!stake.rewardsClaimed && (
                  <Box sx={{ mt: 3 }}>
                    <LoadingButtonWrapper
                      onClick={() => handleWithdraw(index, stake.startTime, stake.duration)}
                      disabled={!account}
                    >
                      Withdraw
                    </LoadingButtonWrapper>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default StakedInfo;