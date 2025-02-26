import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
  Stack,
  Divider,
  Paper
} from '@mui/material';
import { Settings, SwapVert, KeyboardArrowDown } from '@mui/icons-material';
import { getColors } from '../../layout/Theme/themes';
// import { useActiveAccount, useReadContract } from 'thirdweb/react';
// import { config, usdtContract } from '../../config';
import LoadingButtonWrapper from '../StakingPage/LoadingButtonWrapper';

interface SwapDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  approveToken: () => Promise<void>;
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
  // approveToken,
  fromAmount,
  toAmount,
  fromSymbol,
  toSymbol,
  exchangeRate
}) => {
  const colors = getColors();
  // const account = useActiveAccount();

  // const { data: approvedFromToken, isLoading: isApprovedTokenLoading } = useReadContract({
  //   contract: usdtContract,
  //   method: "function allowance(address owner, address spender) view returns (uint256)",
  //   params: [account?.address || "0x", config.dexContractAddress],
  // });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          bgcolor: colors.primary[800],
          color: colors.grey[100],
          minWidth: '400px'
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
            {/* <Box>
              {isApprovedTokenLoading
                ? "..."
                : approvedFromToken !== undefined
                  ? `Total Approved Tokens: ${(Number(approvedFromToken) / 1e18).toLocaleString()} ${fromSymbol || 'BUSD'}`
                  : "Connect Your wallet to see balance"}
            </Box> */}
          </Paper>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        {/* {isApprovedTokenLoading ? (
          "Loading..."
        ) : approvedFromToken !== undefined && Number(approvedFromToken) / 1e18 >= fromAmount ? ( */}
          <LoadingButtonWrapper onClick={onConfirm} disabled={false}>
            Confirm swap
          </LoadingButtonWrapper>
        {/* // ) : (
        //   <LoadingButtonWrapper
        //     onClick={approveToken}
        //   >
        //     Approve {fromSymbol}
        //   </LoadingButtonWrapper>
        // )} */}
      </DialogActions>

    </Dialog>
  );
};

export default SwapDialog;