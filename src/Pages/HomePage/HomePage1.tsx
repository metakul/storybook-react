import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import MetaCopImage from './assets/06.png';

const HomePage1 = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      bgcolor: '#001829',
      color: 'white',
      position: 'absolute',
      left: 0,
      right: 0,
      fontFamily: 'BakBak One, sans-serif',
    }}>
      <Box sx={{ 
        width: '100%',
        maxWidth: '1400px', 
        mx: 'auto',
        p: { xs: 2, sm: 4, md: 8 }
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 4,
          mb: 8
        }}>
          {/* Left Content */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 4,
            flex: 1,
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              opacity: 0,
              animation: 'fadeInFromLeft 1.5s ease-out 0.3s forwards'
            }}>
              <Typography sx={{ 
                fontSize: '1.5rem',
                fontFamily: 'BakBak One'
              }}>
                ON A MISSION TO <span style={{ color: '#FFEB3B' }}>SAVE WEB3</span> 
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
            }}>
              <Typography sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                lineHeight: 1.2,
                fontFamily: 'BakBak One',
                opacity: 0,
                animation: 'fadeInFromLeft 1.5s ease-out 0.6s forwards',
              }}>
                <span style={{ color: '#00ff9d' }}>Thai.Coin Tokenomics</span><br />
                <span style={{ color: '#00ff9d' }}>Total Supply</span> 10,000,000 Thai.Coin Tokens  
              </Typography>
              
              <Typography sx={{ 
                fontSize: '1.25rem',
                color: 'grey.300', 
                maxWidth: '800px',
                fontFamily: 'BakBak One',
                opacity: 0,
                animation: 'fadeInFromLeft 1.5s ease-out 0.9s forwards'
              }}>
                Thai.Coin’s tokenomics is designed to ensure long-term growth, sustainability, and value appreciation for investors and the community.<br />
                Below is a breakdown of the token allocation and how each portion will be utilized.  

              </Typography>
            </Box>
            
            {/* Buttons */}
            <Box sx={{ 
              display: 'flex', 
              gap: 3,
              opacity: 0,
              animation: 'fadeInFromLeft 1.5s ease-out 1.2s forwards'
            }}>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#FFEB3B',
                  color: 'black',
                  fontSize: '1.25rem',
                  padding: '12px 32px',
                  fontFamily: 'BakBak One',
                  '&:hover': { bgcolor: '#FFD700' }
                }}
              >
                ROADMAP
              </Button>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#00ff9d',
                  color: 'black',
                  fontSize: '1.25rem',
                  padding: '12px 32px',
                  fontFamily: 'BakBak One',
                  '&:hover': { bgcolor: '#00cc7d' }
                }}
              >
                CUSTOM-COP
              </Button>
            </Box>
          </Box>
          
          {/* Right Content - NFT Image */}
          <Box sx={{ 
            width: { xs: '100%', md: '500px' },
            opacity: 0,
            animation: 'fadeInFromRight 1.5s ease-out 0.9s forwards'
          }}>
            <Paper sx={{ 
              bgcolor: 'transparent',
              p: 2,
              borderRadius: 2
            }}>
              <Box 
                component="img"
                src={MetaCopImage}
                alt="MetaCop NFT Preview"
                sx={{ width: '100%', borderRadius: 1 }}
              />
            </Paper>
          </Box>
        </Box>
        
        {/* Stats Grid */}
        <Grid container spacing={3}>
          <StatCard number="911" label="TOTAL COPS" color="#00ff9d" />
          <StatCard number="15 APRIL" label="PRE-SALE" color="#FFEB3B" />
          <StatCard number="34" label="WL USERS" color="#00ff9d" />
          <StatCard number="25 APRIL" label="PUBLIC-SALE" color="#FFEB3B" />
        </Grid>
      </Box>
    </Box>
  );
};

const StatCard = ({ number, label, color }) => (
  <Grid item xs={12} md={3}>
    <Paper sx={{ 
      bgcolor: 'black',
      p: 4,
      borderRadius: 2,
      textAlign: 'center',
      fontFamily: 'BakBak One'
    }}>
      <Typography sx={{ 
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: color,
        mb: 1,
        fontFamily: 'BakBak One'
      }}>
        {number}
      </Typography>
      <Typography sx={{ 
        color: 'grey.300',
        fontSize: '1.25rem',
        fontFamily: 'BakBak One'
      }}>
        {label}
      </Typography>
    </Paper>
  </Grid>
);

export default HomePage1;