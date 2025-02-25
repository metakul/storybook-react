import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
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

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    console.info(event);
    
  };

  return (
      <Box
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          py: 8,
          position: 'relative',
        }}
      >
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                position: 'relative',
                zIndex: 2,
                fontWeight: 700,
              }}
            >
              FREQUENTLY ASKED QUESTIONS
            </Typography>
          </Box>

          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              {faqData.map((faq, index) => (
                <StyledAccordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <StyledAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                  >
                    <Typography variant="h5">{faq.question}</Typography>
                  </StyledAccordionSummary>
                  <StyledAccordionDetails>
                    <Typography variant="body1">{faq.answer}</Typography>
                  </StyledAccordionDetails>
                </StyledAccordion>
              ))}
            </Grid>
          </Grid>

       
      </Box>
  );
};

export default FAQSection;