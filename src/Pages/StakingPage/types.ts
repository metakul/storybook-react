export interface StakingDuration {
    value: number;
    label: string;
    apy: number;
    lockedAmount: bigint;
    rewardsEarned: bigint;
  }
  
  export interface LoadingStates {
    maxStake: boolean;
    totalStake: boolean;
    locked: boolean;
    unlocked: boolean;
    rewards: boolean;
  }
  