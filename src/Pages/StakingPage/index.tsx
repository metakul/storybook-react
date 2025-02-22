import { useState } from 'react';
import { Box, Container, Card, CardContent, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { useActiveAccount, useSendTransaction, useReadContract } from "thirdweb/react";
import { config, erc20contract, stakingContract } from '../../config';
import { prepareContractCall } from 'thirdweb';
import { getColors } from '../../layout/Theme/themes';
import { StakingMetrics } from './StakingMetrics';
import { DurationSelector } from './DurationSelector';
import { StakingInfo } from './StakingInfo';
import { TokenInput } from '../../components/TokenInput/TokenInput';
import StakedInfo from './StakedInfo';
import { useNavigate } from 'react-router-dom';

interface StakingDuration {
  value: number;
  label: string;
  apy: number;
  lockedAmount: bigint;
  rewardsEarned: bigint;
}

interface ContractLoadingStates {
  maxStake: boolean;
  totalStake: boolean;
  locked: boolean;
  unlocked: boolean;
  rewards: boolean;
  approvedToken: boolean;
}

const StakingPage: React.FC = () => {
  // Theme and responsive hooks
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate()

  // Blockchain hooks
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  // Local state
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [approvalAmount, setApprovalAmount] = useState<number>(0);
  const [selectedDuration, setSelectedDuration] = useState<number>(30);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isStaking, setIsStaking] = useState<boolean>(false);

  // Contract read hooks
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

  const { data: totalValueLocked } = useReadContract({
    contract: stakingContract,
    method: "function getTotalValueLocked() returns (uint256)",
    params: [],
  });

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

  const { data: maxAndTotalStakeInfo, isLoading: isMaxAndTotalSupplyLoading } = useReadContract({
    contract: stakingContract,
    method: "function getMaxStakeInfo(uint256 _duration) view returns (uint256 maxStake, uint256 totalStake)",
    params: [BigInt(selectedDuration)],
  });

  const { data: stakersCount } = useReadContract({
    contract: stakingContract,
    method: "function getStakersCount() returns (uint256)",
    params: [],
  });

  const { data: currentAPY } = useReadContract({
    contract: stakingContract,
    method: "function getCurrentAPY() returns (uint256)",
    params: [],
  });

  // Staking durations configuration
  const stakingDurations: StakingDuration[] = [
    { value: 30, label: '30 Days', apy: 15, lockedAmount: userLockedAmount || 0n, rewardsEarned: userEarnedAmount || 0n },
    { value: 90, label: '90 Days', apy: 25, lockedAmount: userLockedAmount || 0n, rewardsEarned: userEarnedAmount || 0n },
    { value: 180, label: '180 Days', apy: 25, lockedAmount: userLockedAmount || 0n, rewardsEarned: userEarnedAmount || 0n },
    { value: 360, label: '360 Days', apy: 30, lockedAmount: userLockedAmount || 0n, rewardsEarned: userEarnedAmount || 0n }
  ];

  const selectedAPY = stakingDurations.find(d => d.value === selectedDuration)?.apy || 0;
  const selectedLockedAmount = stakingDurations.find(d => d.value === selectedDuration)?.lockedAmount || 0n;
  const selectedEarnedAmount = stakingDurations.find(d => d.value === selectedDuration)?.rewardsEarned || 0n;

  // Contract interaction handlers
  const handleApprove = async (): Promise<void> => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (approvalAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const amountInWei = BigInt(Math.floor(approvalAmount * 1e18));

    if (erc20Balance === undefined || amountInWei > erc20Balance) {
      alert("Insufficient token balance.");
      return;
    }

    try {
      setIsApproving(true);
      const approveTx = prepareContractCall({
        contract: erc20contract,
        method: "function approve(address spender, uint256 amount)",
        params: [stakingContract.address, amountInWei],
      });
      await sendTransaction(approveTx);
      console.log("Approval successful:", approveTx);

      // Simulate network delay for loading state
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Approval failed. Please try again.");
    } finally {
      setIsApproving(false);
    }
  };

  const handleStake = async (): Promise<void> => {
    if (!account) {
      alert("Please connect your wallet first.");
      return;
    }

    if (stakeAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const amountInWei = BigInt(Math.floor(stakeAmount * 1e18));

    if (erc20Balance === undefined || amountInWei > erc20Balance) {
      alert("Insufficient token balance.");
      return;
    }

    try {
      
      setIsStaking(true);
      const stakeTx = prepareContractCall({
        contract: stakingContract,
        method: "function stake(uint256 _amount, uint256 _duration)",
        params: [amountInWei, BigInt(selectedDuration)],
      });
      
      await sendTransaction(stakeTx);
      
      // Simulate network delay for loading state
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error("Staking failed:", error);
      alert("Staking failed. Please try again.");
    } finally {
      setIsStaking(false);
    }
  };

  // Loading states for the StakingInfo component
  const loadingStates: ContractLoadingStates = {
    maxStake: isMaxAndTotalSupplyLoading,
    totalStake: isMaxAndTotalSupplyLoading,
    locked: isLockedBalanceLoading,
    unlocked: isBalanceLoading,
    rewards: isEarnedBalanceLoading,
    approvedToken: isApprovedTokenLoading
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
            <Typography variant="h4" sx={{
              fontWeight: 500,
              mb: 1,
              fontSize: '28px'
            }}>
              Participate IGO Stake
            </Typography>
            
            <Typography variant="h5" sx={{ mb: 3 }}>
              My Wallet Balance: {isBalanceLoading
                ? "Loading..."
                : erc20Balance !== undefined
                  ? `${(Number(erc20Balance) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                  : "Connect Your wallet to see balance"}
            </Typography>

            <DurationSelector 
              selectedDuration={selectedDuration}
              onDurationChange={setSelectedDuration}
              durations={stakingDurations}
            />

            <StakingInfo
              duration={selectedDuration}
              maxStakeThreshold={maxAndTotalStakeInfo?.[0]}
              totalStakeReached={maxAndTotalStakeInfo?.[1]}
              lockedAmount={selectedLockedAmount}
              unlockedAmount={erc20Balance}
              pendingRewards={selectedEarnedAmount}
              tokenSymbol={erc20Symbol}
              isLoading={loadingStates}
            />

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
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
              <Box  sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              mb: 2,
              position: 'relative'
            }}>
                Not Enough {erc20Symbol}. 
                <Button onClick={() => navigate("/swap")}>
                Buy Now
                </Button>
              </Box>
            <TokenInput
              value={approvalAmount}
              onChange={setApprovalAmount}
              onMaxClick={() => setApprovalAmount(Number(erc20Balance || 0n) / 1e18)}
              actionLabel="Approve"
              onAction={handleApprove}
              disabled={!account || approvalAmount <= 0}
              isLoading={isApproving}
            />

            <Box>
              {isApprovedTokenLoading
                ? "..."
                : erc20ApprovedToken !== undefined
                  ? `Total Approved Tokens: ${(Number(erc20ApprovedToken) / 1e18).toLocaleString()} ${erc20Symbol || 'BUSD'}`
                  : "Connect Your wallet to see balance"}
            </Box>

            <TokenInput
              value={stakeAmount}
              onChange={setStakeAmount}
              onMaxClick={() => setStakeAmount(Number(erc20ApprovedToken || 0n) / 1e18)}
              actionLabel="Stake"
              onAction={handleStake}
              disabled={!account || stakeAmount <= 0}
              isLoading={isStaking}
            />

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

        <StakingMetrics
          totalLocked={totalValueLocked}
          maxApy={currentAPY}
          stakersCount={stakersCount}
          tokenSymbol={erc20Symbol}
        />
      </Box>

      <StakedInfo />
    </Container>
  );
};

export default StakingPage;