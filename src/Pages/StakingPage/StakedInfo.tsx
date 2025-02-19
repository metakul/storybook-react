import { Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { stakingContract } from "../../config";

function StakedInfo() {
  const account = useActiveAccount();

  // Fetch staking details for the active account
  const { data: stakingDetails, isLoading: isStakingDetailsLoading } = useReadContract({
    contract: stakingContract,
    method:
      "function getAllStakedInfo(address _user) view returns (uint256 totalLocked, uint256 totalRewardsPending, uint256 totalClaimedRewards, (uint256 amount, uint256 startTime, uint256 duration, bool rewardsClaimed)[] stakes)",
    params: [account?.address || "0x"], // Use account address or fallback to "0x"
  });

  console.log("stakingDetails",);
  

  // If staking details are loading, show a loading spinner
  if (isStakingDetailsLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // If no staking details are found, display a message
  if (!stakingDetails || stakingDetails[3].length === 0) {
    return (
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="body1">No staking details found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" gutterBottom>
        Staking Details
      </Typography>
      <Typography variant="body1">Total Locked: {(Number(stakingDetails[0]) / 1e18).toLocaleString()} Tokens</Typography>
      <Typography variant="body1">Total Rewards Pending: {(Number(stakingDetails[1]) / 1e18).toLocaleString()} Tokens</Typography>
      <Typography variant="body1">Total Claimed Rewards: {(Number(stakingDetails[2]) / 1e18).toLocaleString()} Tokens</Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
        {stakingDetails[3].map((stake, index) => {
          const stakingStartDate = new Date(Number(stake.startTime) * 1000).toLocaleDateString();
          const stakingPeriodInDays = Number(stake.duration) / 86400;
          return (
            <Card key={index} sx={{ minWidth: 275, padding: 2 }}>
              <CardContent>
                <Typography variant="h6">Stake {index + 1}</Typography>
                <Typography variant="body2">Amount Staked: {(Number(stake.amount) / 1e18).toLocaleString()} Tokens</Typography>
                <Typography variant="body2">Staking Start Date: {stakingStartDate}</Typography>
                <Typography variant="body2">Staking Period: {stakingPeriodInDays} Days</Typography>
                <Typography variant="body2">Rewards Claimed: {stake.rewardsClaimed ? "Yes" : "No"}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}

export default StakedInfo;
