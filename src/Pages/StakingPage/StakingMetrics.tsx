import { Box, Card, CardContent, Typography } from '@mui/material';
import { getColors } from '../../layout/Theme/themes';

interface MetricCardProps {
  value: string;
  label: string;
}

interface StakingMetricsProps {
  totalLocked: bigint | undefined;
  maxApy: bigint | undefined;
  stakersCount: bigint | undefined;
  tokenSymbol: string | undefined;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label }) => (
  <Card sx={{
    bgcolor: getColors().primary[900],
    borderRadius: '16px',
    height: '150px',
    backgroundColor:getColors().yellowAccent[300],

  }}>
    <CardContent sx={{ p: 4 }}>
      <Typography variant="h4" sx={{
        color: getColors().grey[100],
        mb: 2,
        fontWeight: 'bold',
        fontSize: '32px'
      }}>
        {value}
      </Typography>
      <Typography sx={{
                      color: 'rgb(91, 110, 134)',
        fontSize: '16px',
        mt: 1
      }}>
        {label}
      </Typography>
    </CardContent>
  </Card>
);

export const StakingMetrics: React.FC<StakingMetricsProps> = ({ 
  totalLocked, 
  maxApy, 
  stakersCount, 
  tokenSymbol 
}) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: '1 1 38%',
    }}>
      <MetricCard 
        value={`$${(Number(totalLocked || 0n) / 1e18).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`}
        label={`Total ${tokenSymbol} Locked`}
      />
      <MetricCard 
        value={`${parseFloat(maxApy ? (Number(maxApy) / 100).toFixed(2) : '30')}%`}
        label="Max APY"
      />
      <MetricCard 
        value={Number(stakersCount || 0n).toLocaleString()}
        label="Number of Stakers"
      />
    </Box>
  );
};