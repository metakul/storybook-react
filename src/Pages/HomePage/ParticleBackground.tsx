import React from 'react';
import { Box } from '@mui/material';

export const ParticleBackground: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 800,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: 'none',
      }}
    >
      {[...Array(50)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            backgroundColor: 'rgba(255, 0, 0, 0.6)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 5 + 5}s linear infinite`,
            '@keyframes float': {
              '0%': {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 0.8,
              },
              '100%': {
                transform: `translateY(-${Math.random() * 1000}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};