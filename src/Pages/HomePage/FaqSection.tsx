import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledAccordion, StyledAccordionDetails, StyledAccordionSummary } from './CustomMuiStyle';

// FAQ data
const faqData = [
  {
    question: "How is ThaiCoin different from other Memecoin?",
    answer: "ThaiCoin builds on the legacy of Thai Community with enhanced features including a sustainable memecoin trading mechanism, smart contract functionality, and improved tokenomics while maintaining the fun and community-driven nature of the original."
  },
  {
    question: "How will ThaiCoin do staking?",
    answer: "ThaiCoin implements a user-friendly staking mechanism where token holders can stake their ThaiCoin through our dedicated staking platform. Simply connect your wallet, choose the amount and duration, and start earning rewards based on your contribution to network security."
  },
  {
    question: "Does ThaiCoin have other features?",
    answer: "Yes, ThaiCoin comes with a robust feature set including smart contracts, DeFi capabilities, governance rights for token holders, cross-chain compatibility, and a comprehensive ecosystem of dApps built specifically for the ThaiCoin community."
  },
  {
    question: "What are the ThaiCoin tokenomics?",
    answer: "ThaiCoin has a fixed supply model with clear token allocation: 30% to community initiatives, 20% to development funds, 15% for exchange liquidity, 15% for staking rewards, 10% for team and advisors (vested), and 10% for marketing and partnerships, ensuring long-term sustainability."
  },
  {
    question: "How do I find technical support?",
    answer: "For technical support, you can reach out through our official Discord server, submit a ticket through our website support portal, or email support@ThaiCoin.io. Our community managers are also available on Telegram to help resolve common issues."
  }
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ 
      py: 8, 
      backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: isDarkMode 
          ? 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0) 70%)' 
          : 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0) 70%)',
        animation: 'pulse 15s infinite',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: -50,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: isDarkMode 
          ? 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0) 70%)' 
          : 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(255, 215, 0, 0) 70%)',
        animation: 'pulse 10s infinite 2s',
      },
      '@keyframes pulse': {
        '0%': { opacity: 0.5, transform: 'scale(1)' },
        '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        '100%': { opacity: 0.5, transform: 'scale(1)' },
      },
    }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Typography 
            variant="h2" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 5, 
              fontWeight: 700,
              color: '#FFC107',
              textShadow: isDarkMode 
                ? '0 2px 15px rgba(255, 193, 7, 0.4)' 
                : '0 2px 10px rgba(255, 193, 7, 0.2)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                backgroundColor: '#FFD700',
                borderRadius: '2px',
                boxShadow: isDarkMode ? '0 0 8px rgba(255, 215, 0, 0.5)' : 'none'
              }
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </Typography>
          
          <Box sx={{ mb: 4, position: 'relative', zIndex: 2 }}>
            {faqData.map((faq, index) => (
              <StyledAccordion
                key={`panel${index}`}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  mb: 2.5,
                  borderRadius: '12px',
                  border: isDarkMode 
                    ? '1px solid rgba(255, 193, 7, 0.3)' 
                    : '1px solid rgba(255, 193, 7, 0.3)',
                  boxShadow: expanded === `panel${index}` 
                    ? isDarkMode 
                      ? '0 5px 15px rgba(255, 193, 7, 0.2)' 
                      : '0 5px 15px rgba(255, 193, 7, 0.15)' 
                    : isDarkMode 
                      ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                      : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: isDarkMode 
                      ? '0 5px 15px rgba(255, 193, 7, 0.2)' 
                      : '0 5px 15px rgba(255, 193, 7, 0.15)',
                    borderColor: 'rgba(255, 193, 7, 0.5)',
                  },
                  '&:before': {
                    display: 'none',
                  },
                  overflow: 'hidden'
                }}
              >
                <StyledAccordionSummary
                  expandIcon={
                    <Box sx={{ 
                      backgroundColor: expanded === `panel${index}` 
                        ? '#FFC107' 
                        : isDarkMode 
                          ? 'rgba(255, 193, 7, 0.2)' 
                          : 'rgba(255, 193, 7, 0.1)',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}>
                      <ExpandMoreIcon sx={{ 
                        color: expanded === `panel${index}` 
                          ? isDarkMode ? '#000000' : '#FFFFFF' 
                          : '#FFC107',
                        fontSize: '1.2rem',
                        transition: 'all 0.3s ease',
                      }} />
                    </Box>
                  }
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    py: 2,
                    px: 3,
                    backgroundColor: expanded === `panel${index}` 
                      ? isDarkMode 
                        ? 'rgba(255, 193, 7, 0.1)' 
                        : 'rgba(255, 193, 7, 0.05)' 
                      : 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: isDarkMode 
                        ? 'rgba(255, 193, 7, 0.1)' 
                        : 'rgba(255, 193, 7, 0.05)',
                    },
                    '& .MuiAccordionSummary-content': {
                      margin: 0,
                    }
                  }}
                >
                  <Typography sx={{ 
                    fontWeight: 600, 
                    color: expanded === `panel${index}` 
                      ? '#FFC107' 
                      : isDarkMode ? '#E0E0E0' : '#333333',
                    transition: 'color 0.3s ease',
                  }}>
                    {faq.question}
                  </Typography>
                </StyledAccordionSummary>
                <StyledAccordionDetails sx={{ 
                  py: 2.5,
                  px: 3,
                  backgroundColor: isDarkMode 
                    ? 'rgba(40, 35, 20, 0.5)' 
                    : 'rgba(255, 250, 240, 0.3)',
                  borderTop: isDarkMode 
                    ? '1px solid rgba(255, 193, 7, 0.2)' 
                    : '1px solid rgba(255, 193, 7, 0.1)',
                }}>
                  <Typography sx={{ 
                    color: isDarkMode ? '#AAAAAA' : '#666666',
                    lineHeight: 1.6,
                    position: 'relative',
                    pl: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      backgroundColor: isDarkMode 
                        ? 'rgba(255, 193, 7, 0.6)' 
                        : 'rgba(255, 193, 7, 0.4)',
                      borderRadius: 4,
                      boxShadow: isDarkMode ? '0 0 8px rgba(255, 193, 7, 0.3)' : 'none'
                    }
                  }}>
                    {faq.answer}
                  </Typography>
                </StyledAccordionDetails>
              </StyledAccordion>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FAQSection;