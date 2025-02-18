import { Box, Typography, CircularProgress } from '@mui/material';
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { stakingContract } from '../../config';

function StakedInfo() {
  const account = useActiveAccount();

  // Fetch staking details for the active account
  const { data: stakingDetails, isLoading: isStakingDetailsLoading } = useReadContract({
    contract: stakingContract,
    method: "function getStakeDetails(address _user) view returns ((uint256 amount, uint256 stakingPeriod, uint256 stakingStartTime, bool claimed))",
    params: [account?.address || "0x"], // Use account address or fallback to "0x"
  });

  // If staking details are loading, show a loading spinner
  if (isStakingDetailsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If no staking details are found, display a message
  if (!stakingDetails) {
    return (
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="body1">No staking details found.</Typography>
      </Box>
    );
  }

  // Destructure staking details
  const { amount, stakingPeriod, stakingStartTime, claimed } = stakingDetails;

  // Convert staking period from seconds to days
  const stakingPeriodInDays = Number(stakingPeriod) / 86400;

  // Format staking start time to a readable date
  const stakingStartDate = new Date(Number(stakingStartTime) * 1000).toLocaleDateString();

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6">Staking Details</Typography>
      <Typography variant="body1">Amount Staked: {(Number(amount) / 1e18).toLocaleString()} Tokens</Typography>
      <Typography variant="body1">Staking Period: {stakingPeriodInDays} Days</Typography>
      <Typography variant="body1">Staking Start Date: {stakingStartDate}</Typography>
      <Typography variant="body1">Claimed: {claimed ? "Yes" : "No"}</Typography>
    </Box>
  );
}

export default StakedInfo;