import { Box, Button } from '@mui/material';
import LoadingButtonWrapper from '../../Pages/StakingPage/LoadingButtonWrapper';

interface TokenInputProps {
  value: number;
  onChange?: (value: number) => void;
  onMaxClick?: () => void;
  actionLabel?: string;
  onAction?: () => Promise<void>; // Updated to return a Promise
  disabled: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  onMaxClick,
  actionLabel,
  onAction,
  disabled,
}) => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 2,
      mb: 2,
    }}>
      <Box sx={{
        flex: 3,
        p: 2,
        border: '1px solid rgba(30, 41, 59, 0.3)',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)'
      }}>
        <input
          type="number"
          value={value}
          onChange={onChange ? (e) => onChange(parseFloat(e.target.value) || 0) : undefined}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            width: '100%',
            outline: 'none',
            fontSize: '16px',
            appearance: onChange ? 'auto' : 'textfield' // Hide arrows if no onChange
          }}
          placeholder="0"
        />
        {onMaxClick &&
          <Button
            sx={{
              color: 'white',
              minWidth: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(30, 41, 59, 0.3)'
              }
            }}
            onClick={onMaxClick}
          >
            Max
          </Button>
        }
      </Box>
      <LoadingButtonWrapper onClick={onAction} disabled={disabled}>
        {actionLabel}
      </LoadingButtonWrapper>
    </Box>
  );
};
