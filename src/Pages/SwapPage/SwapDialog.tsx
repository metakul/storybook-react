import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import { Settings, SwapVert, KeyboardArrowDown } from '@mui/icons-material';
import { getColors } from '../../layout/Theme/themes';

interface SwapDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fromAmount: number;
  toAmount: number;
  fromSymbol: string;
  toSymbol: string;
  exchangeRate: number;
}

const SwapDialog: React.FC<SwapDialogProps> = ({
  open,
  onClose,
  onConfirm,
  fromAmount,
  toAmount,
  fromSymbol,
  toSymbol,
  exchangeRate
}) => {
  const colors = getColors();

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: colors.primary[800],
          color: colors.grey[100],
          minWidth: '320px'
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6">Swap summary</Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: colors.grey[100] }}>
          <Settings />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          {/* Swap Details */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2 }}>
            <Box>
              <Typography variant="h6">{fromAmount.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${(fromAmount).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6">{fromSymbol}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <SwapVert />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 2 }}>
            <Box>
              <Typography variant="h6">{toAmount.toLocaleString()}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${(toAmount).toLocaleString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6">{toSymbol}</Typography>
            </Box>
          </Box>

          <Divider sx={{ bgcolor: colors.grey[700] }} />

          {/* Exchange Rate */}
          <Paper 
            sx={{ 
              bgcolor: colors.primary[700],
              p: 2,
              borderRadius: 2,
              cursor: 'pointer'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>Swap details</Typography>
              <KeyboardArrowDown />
            </Box>
            <Typography variant="body2" color="text.secondary">
              1 {fromSymbol} = {exchangeRate} {toSymbol}
            </Typography>
          </Paper>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          fullWidth 
          variant="contained" 
          onClick={onConfirm}
          sx={{
            bgcolor: 'error.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'error.dark',
            },
            borderRadius: 2,
            py: 1.5
          }}
        >
          Confirm swap
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SwapDialog;