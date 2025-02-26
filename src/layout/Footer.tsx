// src/components/Footer/Footer.tsx
import { Box, Container, Grid, Typography, Stack, IconButton, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import RedditIcon from '@mui/icons-material/Reddit';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../Datatypes/enums';

// Custom Discord icon since Material UI doesn't include one
const DiscordIcon = () => (
  <Box
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    sx={{ width: 24, height: 24, fill: 'currentColor' }}
  >
    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.907-.55 1.31a19.27 19.27 0 0 0-5.605 0 13.536 13.536 0 0 0-.565-1.31.079.079 0 0 0-.079-.036 20.099 20.099 0 0 0-4.885 1.49.072.072 0 0 0-.033.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.343 20.343 0 0 0 6.126 3.087.078.078 0 0 0 .084-.027c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.042-.106 13.404 13.404 0 0 1-1.911-.913.077.077 0 0 1-.008-.128 10.66 10.66 0 0 0 .372-.292.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.2.372.292a.077.077 0 0 1-.006.127 12.6 12.6 0 0 1-1.913.913.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.077.077 0 0 0 .084.028 20.281 20.281 0 0 0 6.135-3.087.077.077 0 0 0 .03-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029zM8.02 15.278c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </Box>
);

// const StyledIconButton = styled(IconButton)(({ theme }) => ({
//   color: '#FFD700',
//   backgroundColor: 'rgba(0, 0, 0, 0.8)',
//   margin: theme.spacing(0.5),
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     backgroundColor: '#FFD700',
//     color: 'black',
//     transform: 'translateY(-3px)',
//   },
// }));

const FooterLink = styled(Typography)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  padding: theme.spacing(0.5, 0),
  transition: 'color 0.3s, transform 0.3s',
  display: 'inline-block',
  '&:hover': {
    color: '#FFD700',
    transform: 'translateX(5px)',
    textDecoration: 'none',
    cursor: 'pointer',
  },
}));

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const navigateTo = (page: Pages) => {
    navigate(page);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        pt: 6,
        pb: 3,
        pl:4,
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
      }}
    >
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 4 }}>
              <Box
                component="img"
                src="thaicoin.png"
                alt="ThaiCoin Logo"
                sx={{
                  height: 80,
                  mb: 2
                }}
              />
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.7, maxWidth: 250 }}>
                The Ultimate crypto to invest in Thailand Real Estates with innovative tokenomics and community-driven growth.
              </Typography>
              <Stack direction="row" flexWrap="wrap">
                <IconButton aria-label="Twitter" component="a" href="https://twitter.com/thaicoin" target="_blank">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Telegram" component="a" href="https://t.me/thaicoin" target="_blank">
                  <TelegramIcon />
                </IconButton>
                <IconButton aria-label="Discord" component="a" href="https://discord.gg/thaicoin" target="_blank">
                  <DiscordIcon />
                </IconButton>
                <IconButton aria-label="Reddit" component="a" href="https://reddit.com/r/thaicoin" target="_blank">
                  <RedditIcon />
                </IconButton>
                <IconButton aria-label="GitHub" component="a" href="https://github.com/thaicoin" target="_blank">
                  <GitHubIcon />
                </IconButton>
                <IconButton aria-label="Instagram" component="a" href="https://instagram.com/thaicoin" target="_blank">
                  <InstagramIcon />
                </IconButton>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFD700' }}>
              Quick Links
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
              <FooterLink onClick={() => navigateTo(Pages.Home)}>Home</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.Swap)}>Buy $THAI</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.Staking)}>Stake</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.Whitepaper)}>Whitepaper</FooterLink>
              <FooterLink
                onClick={() => {
                  navigateTo(Pages.Home);
                  setTimeout(() => {
                    window.location.hash = "roadmap";
                  }, 100);
                }}
              >
                Roadmap
              </FooterLink>
            </Box>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFD700' }}>
              Resources
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
              <FooterLink onClick={() => navigateTo(Pages.Tokenomics)}>Tokenomics</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.Team)}>Team</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.Partners)}>Partners</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.FAQ)}>FAQ</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.Blog)}>News</FooterLink>
            </Box>
          </Grid> */}

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#FFD700' }}>
              Legal
            </Typography>
            <Box component="nav" sx={{ display: 'flex', flexDirection: 'column' }}>
              <FooterLink onClick={() => navigateTo(Pages.PrivacyPolicy)}>Privacy Policy</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.TermsOfService)}>Terms of Service</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.Disclaimer)}>Disclaimer</FooterLink>
              <FooterLink onClick={() => navigateTo(Pages.Contact)}>Contact Us</FooterLink>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'rgba(255, 215, 0, 0.2)' }} />

        <Box sx={{ textAlign: 'center', opacity: 0.7 }}>
          <Typography variant="body2">
            &copy; {currentYear} ThaiCoin. All rights reserved.
          </Typography>
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            $THAI is a community-driven project. Trading cryptocurrencies involves significant risk.
          </Typography>
        </Box>
    </Box>
  );
};

export default Footer;