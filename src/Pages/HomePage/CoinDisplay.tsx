import React from 'react';
import { Box, Zoom } from '@mui/material';

interface CoinDisplayProps {
  animate: boolean;
}

export const CoinDisplay: React.FC<CoinDisplayProps> = ({ animate }) => {
  return (
    <Zoom in={animate} style={{ transitionDelay: '500ms' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <Box
          component="img"
          src="thaicoin.png"
          alt="ThaiCoin Logo"
          sx={{
            width: '100%',
            maxWidth: 550,
            filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))',
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%': {
                transform: 'translateY(0px) rotate(0deg)',
              },
              '50%': {
                transform: 'translateY(-20px) rotate(5deg)',
              },
              '100%': {
                transform: 'translateY(0px) rotate(0deg)',
              },
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-10%',
            left: '15%',
            right: '15%',
            height: '20%',
            backgroundImage: 'radial-gradient(ellipse at center, rgba(255,215,0,0.5) 0%, rgba(255,215,0,0) 70%)',
            filter: 'blur(15px)',
            transform: 'translateY(20px) scale(1.2)',
            zIndex: -1,
          }}
        />
      </Box>
    </Zoom>
  );
};