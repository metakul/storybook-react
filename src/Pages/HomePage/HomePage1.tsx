// src/pages/HomePage/HomePage1.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../../Datatypes/enums';
import { getColors } from '../../layout/Theme/themes';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { Fade, Zoom } from '@mui/material';

// Import our component files
import { ParticleBackground } from './ParticleBackground';
import { StatCard } from './StatCard';
import { CoinDisplay } from './CoinDisplay';

const HomePage1 = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const navigateToStake = () => {
    navigate(Pages.Staking);
  };
  
  const navigateToBuy = () => {
    navigate(Pages.Swap);
  };

  return (
    <Box 
      sx={{
        background: `linear-gradient(135deg, ${getColors().yellowAccent[100]} 0%, #FFF9C4 50%, ${getColors().yellowAccent[300]} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
        minHeight: '100vh'
      }}
    >
      <ParticleBackground />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Fade in={animate} timeout={1000}>
              <Box>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    fontWeight: 'bold',
                    color: '#1A237E',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    display: 'block',
                    mb: 1
                  }}
                >
                  Memecoin for Real Estates
                </Typography>
                
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 800,
                    color: '#000',
                    lineHeight: 1.1,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem', lg: '5rem' },
                    mb: { xs: 2, md: 4 },
                    fontFamily: '"BakBak One", "Roboto", sans-serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Connect & join the Thai community
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: { xs: '1.1rem', md: '1.4rem' },
                    color: '#424242',
                    mb: { xs: 4, md: 6 },
                    maxWidth: '90%'
                  }}
                >
                  The Ultimate crypto to invest in Thailand Real Estates with innovative tokenomics and community-driven growth.
                </Typography>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3}
                  sx={{ mb: 4 }}
                >
                  <Button
                    variant="contained"
                    onClick={navigateToBuy}
                    size="large"
                    endIcon={<ArrowCircleRightIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 6,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      backgroundColor: '#FFD700',
                      color: '#000',
                      boxShadow: '0 10px 20px rgba(255, 215, 0, 0.3)',
                      '&:hover': {
                        backgroundColor: '#FFC400',
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 25px rgba(255, 215, 0, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Buy $THAI Now
                  </Button>
                  
                  <Button
                    variant="outlined"
                    onClick={navigateToStake}
                    size="large"
                    startIcon={<LocalAtmIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 6,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderColor: '#000',
                      color: '#000',
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: '#000',
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        borderWidth: 2,
                      },
                    }}
                  >
                    Stake $THAI
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Grid>
          
          <Grid item xs={12} lg={6}>
            <CoinDisplay animate={animate} />
          </Grid>
        </Grid>

        {/* Stats Section */}
        <Box sx={{ mt: { xs: 10, md: 16 }, mb: 8 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 8,
              color: '#000',
              fontFamily: '"BakBak One", "Roboto", sans-serif'
            }}
          >
            ThaiCoin Ecosystem Stats
          </Typography>
          
          <Grid container spacing={4}>
            <StatCard 
              number="$12.5M" 
              label="Market Cap" 
              color="#FFD700" 
              icon={<AccountBalanceIcon fontSize="inherit" />}
              delay={200}
            />
            <StatCard 
              number="42,500+" 
              label="Holders" 
              color="#FFD700" 
              icon={<LocalAtmIcon fontSize="inherit" />}
              delay={400}
            />
            <StatCard 
              number="18%" 
              label="APY Staking" 
              color="#FFD700" 
              icon={<AccountBalanceIcon fontSize="inherit" />}
              delay={600}
            />
            <StatCard 
              number="$2.8M" 
              label="24h Volume" 
              color="#FFD700" 
              icon={<LocalAtmIcon fontSize="inherit" />}
              delay={800}
            />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage1;