// src/pages/HomePage/components/StatCard.tsx
import React from 'react';
import { Grid, Paper, Typography, Box, Zoom } from '@mui/material';

// Define the prop types for the StatCard component
interface StatCardProps {
  number: string;
  label: string;
  color: string;
  icon?: React.ReactNode;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label, color, icon, delay = 0 }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Paper 
        elevation={6}
        sx={{ 
          bgcolor: 'black',
          p: 3,
          borderRadius: 4,
          textAlign: 'center',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s',
          border: `2px solid ${color}`,
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: `0 10px 20px rgba(${color === '#FFD700' ? '255, 215, 0' : '0, 0, 0'}, 0.3)`,
          }
        }}
      >
        <Box sx={{ mb: 2, color: color, fontSize: '2rem' }}>
          {icon}
        </Box>
        <Typography sx={{ 
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          fontWeight: 'bold',
          color: color,
          mb: 1,
          fontFamily: '"BakBak One", "Roboto", sans-serif'
        }}>
          {number}
        </Typography>
        <Typography sx={{ 
          color: 'grey.300',
          fontSize: { xs: '1rem', md: '1.2rem' },
          fontFamily: '"BakBak One", "Roboto", sans-serif'
        }}>
          {label}
        </Typography>
      </Paper>
    </Zoom>
  </Grid>
);