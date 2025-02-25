import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import MetaCopImage from './assets/06.png';

const HomePage2 = () => {
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
                fontSize: '2rem',
                fontFamily: 'BakBak One',
                color: '#00A3FF'
              }}>
                THE TALE OF METACOPS:
              </Typography>
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
            }}>
              <Typography sx={{ 
                fontSize: '1.25rem',
                color: '#00ff9d',
                maxWidth: '800px',
                fontFamily: 'BakBak One',
                opacity: 0,
                animation: 'fadeInFromLeft 1.5s ease-out 0.6s forwards'
              }}>
                In the digital realm, there existed extraordinary beings known as Metacops! 🚀
              </Typography>
              
              <Typography sx={{ 
                fontSize: '1.25rem',
                color: 'grey.300', 
                maxWidth: '800px',
                fontFamily: 'BakBak One',
                opacity: 0,
                animation: 'fadeInFromLeft 1.5s ease-out 0.9s forwards'
              }}>
                These friendly superheroes, armed with smart computer brains, embarked on a mission to make the online world safer and more enjoyable for everyone. 🌐
              </Typography>

              <Typography sx={{ 
                fontSize: '1.25rem',
                color: '#00ff9d',
                maxWidth: '800px',
                fontFamily: 'BakBak One',
                opacity: 0,
                animation: 'fadeInFromLeft 1.5s ease-out 1.2s forwards'
              }}>
                Picture them as digital superheroes patrolling the Internet streets, ready to assist anyone feeling lost or confused in the vast digital landscape. 🚀
              </Typography>

              <Typography sx={{ 
                fontSize: '1.25rem',
                color: 'grey.300',
                maxWidth: '800px',
                fontFamily: 'BakBak One',
                opacity: 0,
                animation: 'fadeInFromLeft 1.5s ease-out 1.5s forwards'
              }}>
                But, oh no! Some special Metacops NFTs went missing, and a call for help echoed through the digital realm. Your mission, should you choose to accept it: bring back these NFTs and safeguard the online world. 👮
              </Typography>
            </Box>
            
            {/* Join Adventure Section */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2,
              opacity: 0,
              animation: 'fadeInFromLeft 1.5s ease-out 1.8s forwards'
            }}>
              <Typography sx={{ 
                fontSize: '1.25rem',
                color: '#00ff9d',
                fontFamily: 'BakBak One'
              }}>
                Now, join the adventure! Become a part of the Metacops mission by acquiring your own unique Metacop NFT. It's as easy as 1, 2, 3, 4—connect your wallet, choose,
              </Typography>
              
              <Typography sx={{ 
                fontSize: '2.5rem',
                fontWeight: 'bold',
                fontFamily: 'BakBak One',
                color: 'white'
              }}>
                CONFIRM AND VOILA! 🌈
              </Typography>
            </Box>
          </Box>
          
          {/* Right Content - Metacop Images */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: { xs: '100%', md: '500px' },
            opacity: 0,
            animation: 'fadeInFromRight 1.5s ease-out 0.9s forwards'
          }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper sx={{ bgcolor: 'transparent', p: 1, borderRadius: 2 }}>
                  <Box 
                    component="img"
                    src={MetaCopImage}
                    alt="MetaCop 1"
                    sx={{ width: '100%', borderRadius: 1 }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Paper sx={{ bgcolor: 'transparent', p: 1, borderRadius: 2 }}>
                  <Box 
                    component="img"
                    src={MetaCopImage}
                    alt="MetaCop Main"
                    sx={{ width: '100%', borderRadius: 1 }}
                  />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper sx={{ bgcolor: 'transparent', p: 1, borderRadius: 2 }}>
                  <Box 
                    component="img"
                    src={MetaCopImage}
                    alt="MetaCop 2"
                    sx={{ width: '100%', borderRadius: 1 }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage2;