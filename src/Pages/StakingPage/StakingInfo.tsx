import { Box, Typography } from '@mui/material';
import { LoadingStates } from './types';

interface StakingInfoProps {
  duration: number;
  maxStakeThreshold: bigint | undefined;
  totalStakeReached: bigint | undefined;
  lockedAmount: bigint | undefined;
  unlockedAmount: bigint | undefined;
  pendingRewards: bigint | undefined;
  tokenSymbol: string | undefined;
  isLoading: LoadingStates;
}

interface InfoRowProps {
  label: string;
  value: string;
}

export const StakingInfo: React.FC<StakingInfoProps> = ({ 
  duration, 
  maxStakeThreshold, 
  totalStakeReached, 
  lockedAmount, 
  unlockedAmount, 
  pendingRewards, 
  tokenSymbol,
  isLoading 
}) => {
  const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
      <Typography>{label}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );

  const formatAmount = (amount: bigint | undefined): string => {
    if (!amount) return "0";
    return (Number(amount) / 1e18).toLocaleString();
  };

  return (
    <Box sx={{ mb: 4, color: 'rgb(0, 0, 0)' }}>
      <InfoRow label="Lock period:" value={`${duration} Days`} />
      <InfoRow 
        label="Max Staking Threshold:"
        value={isLoading.maxStake ? "..." : `${formatAmount(maxStakeThreshold)} ${tokenSymbol}`}
      />
      <InfoRow 
        label="Total Staking Reached:"
        value={isLoading.totalStake ? "..." : `${formatAmount(totalStakeReached)} ${tokenSymbol}`}
      />
      <InfoRow 
        label="Your Locked Amount:"
        value={isLoading.locked ? "..." : `${formatAmount(lockedAmount)} ${tokenSymbol}`}
      />
      <InfoRow 
        label="Your Unlocked Account:"
        value={isLoading.unlocked ? "..." : `${formatAmount(unlockedAmount)} ${tokenSymbol}`}
      />
      <InfoRow 
        label="Your Pending Rewards:"
        value={isLoading.rewards ? "..." : `${formatAmount(pendingRewards)} ${tokenSymbol}`}
      />
    </Box>
  );
};