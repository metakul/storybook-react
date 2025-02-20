// LoadingButtonWrapper.tsx
import React, { useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import { getColors } from '../../layout/Theme/themes';

interface LoadingButtonWrapperProps {
  onClick: () => Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
}

const LoadingButtonWrapper: React.FC<LoadingButtonWrapperProps> = ({ 
  onClick, 
  children, 
  disabled = false 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const colors = getColors();

  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      // Add random delay between 4-6 seconds
      const delay = Math.floor(Math.random() * (6000 - 4000) + 4000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      sx={{
        flex: 1,
        width: '100%',
        bgcolor: colors.greenAccent[800],
        color: colors.grey[100],
        py: 1.5,
        borderRadius: '8px',
        '&:hover': {
          bgcolor: '#4338ca'
        },
        '&:disabled': {
          bgcolor: colors.grey[700],
          color: colors.grey[400]
        },
        textTransform: 'none',
        fontWeight: 'medium',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        letterSpacing: '0.025em',
        transition: 'all 0.2s ease-in-out'
      }}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={20} sx={{ color: colors.grey[100], mr: 1 }} />
          Submitting transaction...
        </Box>
      ) : children}
    </Button>
  );
};

export default LoadingButtonWrapper;