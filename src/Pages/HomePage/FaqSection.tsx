import React, { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Button,
  Grid,
  createTheme,
  ThemeProvider,
  styled
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Custom styled components
const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  }
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: '24px 0',
  '& .MuiAccordionSummary-content': {
    margin: 0,
  },
  '& .MuiSvgIcon-root': {
    color: '#F2C94C',
    fontSize: '1.5rem',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '0 0 24px 0',
  borderTop: 'none',
}));

// Create custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F2C94C',
    },
    background: {
      default: '#0D0D0D',
      paper: '#0D0D0D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.2rem',
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
});

// FAQ data
const faqData = [
  {
    question: "How is Dogecoin20 different to Dogecoin?",
    answer: "Dogecoin20 builds on the legacy of Dogecoin with enhanced features including a sustainable proof-of-stake consensus mechanism, smart contract functionality, and improved tokenomics while maintaining the fun and community-driven nature of the original."
  },
  {
    question: "How will Dogecoin20 do staking?",
    answer: "Dogecoin20 implements a user-friendly staking mechanism where token holders can stake their DOGE20 through our dedicated staking platform. Simply connect your wallet, choose the amount and duration, and start earning rewards based on your contribution to network security."
  },
  {
    question: "Does Dogecoin20 have other features?",
    answer: "Yes, Dogecoin20 comes with a robust feature set including smart contracts, DeFi capabilities, governance rights for token holders, cross-chain compatibility, and a comprehensive ecosystem of dApps built specifically for the Dogecoin20 community."
  },
  {
    question: "What are the DOGE20 tokenomics?",
    answer: "DOGE20 has a fixed supply model with clear token allocation: 30% to community initiatives, 20% to development funds, 15% for exchange liquidity, 15% for staking rewards, 10% for team and advisors (vested), and 10% for marketing and partnerships, ensuring long-term sustainability."
  },
  {
    question: "How do I find technical support?",
    answer: "For technical support, you can reach out through our official Discord server, submit a ticket through our website support portal, or email support@dogecoin20.io. Our community managers are also available on Telegram to help resolve common issues."
  }
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: '#0D0D0D',
          backgroundImage: 'url(/dogecoin-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          py: 8,
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                color: '#FFFFFF',
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

          <Box mt={6} display="flex" justifyContent="center">
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ 
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                backgroundColor: '#F2C94C',
                color: '#0D0D0D',
                '&:hover': {
                  backgroundColor: '#D4AF37',
                }
              }}
            >
              CONNECT WALLET
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FAQSection;