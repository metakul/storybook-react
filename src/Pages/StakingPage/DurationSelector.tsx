import { Button, Box } from '@mui/material';
import { StakingDuration } from './types';

interface DurationSelectorProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
  durations: StakingDuration[];
}

export const DurationSelector: React.FC<DurationSelectorProps> = ({ 
  selectedDuration, 
  onDurationChange, 
  durations 
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
      {durations.map((duration) => (
        <Button
          key={duration.value}
          sx={{
            bgcolor: selectedDuration === duration.value
              ? '#4f46e5'
              : 'rgba(15, 23, 42, 0.6)',
            color: 'white',
            '&:hover': {
              bgcolor: selectedDuration === duration.value
                ? '#4338ca'
                : 'rgba(30, 41, 59, 0.8)'
            },
            textTransform: 'none',
            borderRadius: '8px',
            py: 1,
            px: 3,
            border: selectedDuration === duration.value
              ? 'none'
              : '1px solid rgba(30, 41, 59, 0.3)',
            boxShadow: selectedDuration === duration.value
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              : 'inset 0 2px 5px rgba(0, 0, 0, 0.2)',
            fontWeight: selectedDuration === duration.value ? 'medium' : 'normal',
            transition: 'all 0.2s ease-in-out'
          }}
          onClick={() => onDurationChange(duration.value)}
        >
          {duration.label}
        </Button>
      ))}
    </Box>
  );
};