import React from "react";
import { motion } from "framer-motion";
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  AppBar, 
  Toolbar, 
  Stack, 
  Paper, 
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Avatar,
  styled,
  Theme,
  useTheme
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Custom theme for Thai.Coin
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff9d",
    },
    secondary: {
      main: "#FFEB3B",
    },
    background: {
      default: "#001829",
      paper: "rgba(0, 0, 0, 0.8)",
    },
  },
  typography: {
    fontFamily: "'BakBak One', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          fontWeight: 700,
          padding: "8px 16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

// Styled components
const GradientBackground = styled(Box)({
  minHeight: "100vh",
  background: "linear-gradient(to bottom, #001829, #000000)",
  position: "relative",
  overflow: "hidden",
  padding: theme.spacing(8, 2),
});

const TimelineLine = styled(Box)({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "6px",
  height: "100%",
  backgroundColor: "#00ff9d",
  opacity: 0.5,
  boxShadow: "0 0 15px rgba(0, 255, 157, 0.3)",
});

const PercentageHighlight = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  fontSize: "2rem",
  textShadow: "0 0 10px rgba(0, 255, 157, 0.5)",
}));

const RoadmapCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  border: "2px solid rgba(0, 255, 157, 0.4)",
  backdropFilter: "blur(10px)",
  boxShadow: theme.shadows[10],
  width: "90%",
  maxWidth: "450px",
  position: "relative",
  zIndex: 10,
}));

const NumberIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "black",
  width: 24,
  height: 24,
  fontSize: "0.75rem",
  fontWeight: 700,
  boxShadow: "0 0 8px rgba(0, 255, 157, 0.4)",
}));

// Interface for roadmap items
interface RoadmapItemProps {
  phase: string;
  title: string;
  allocation: string;
  percentage: number;
  items: string[];
  completed?: boolean;
  active?: boolean;
  index: number; // Added index to determine animation direction
}

// Roadmap Item Component
const RoadmapItem: React.FC<RoadmapItemProps> = ({
  phase,
  title,
  allocation,
  percentage,
  items,
  completed,
  active,
  index,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Determine if the item should come from left or right based on index
  const isFromLeft = index % 2 === 0;
  
  // Calculate year/quarter from index for display
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const year = 2023 + Math.floor(index / 4);
  const quarter = quarters[index % 4];
  
  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: isFromLeft ? { xs: "center", md: "flex-end" } : { xs: "center", md: "flex-start" },
        width: "100%",
        position: "relative",
      }}
    >
      {/* Timeline dot */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: 35,
          transform: "translateX(-50%)",
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: "#00ff9d",
          boxShadow: "0 0 15px rgba(0, 255, 157, 0.5)",
          zIndex: 5,
        }}
      />
      
      {/* Card on the appropriate side */}
      <Box 
        sx={{ 
          width: { xs: "100%", md: "50%" }, 
          pr: isFromLeft ? { xs: 0, md: 4 } : 0,
          pl: isFromLeft ? 0 : { xs: 0, md: 4 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: isFromLeft ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ 
            type: "spring", 
            duration: 0.8, 
            bounce: 0.3 
          }}
        >
          <RoadmapCard 
            elevation={6}
            sx={{
              borderColor: active ? "#00ff9d" : completed ? "#00ff9d" : "rgba(0, 255, 157, 0.4)",
              transition: "all 0.3s ease",
              marginLeft: isFromLeft ? { xs: "auto", md: 0 } : { xs: "auto", md: "auto" },
              marginRight: isFromLeft ? { xs: "auto", md: "auto" } : { xs: "auto", md: 0 },
              "&:hover": {
                boxShadow: "0 8px 16px rgba(0, 255, 157, 0.2)",
                transform: "translateY(-4px)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  color: "black", // Changed to black for better visibility
                  backgroundColor: theme.palette.primary.main,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)"
                }}
              >
                {title} ({quarter} {year})
              </Typography>
              <PercentageHighlight>{percentage}%</PercentageHighlight>
            </Box>

            <Typography 
              variant="body2" 
              color="secondary" 
              sx={{ mb: 3 }}
            >
              {allocation}
            </Typography>

            <List disablePadding>
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isFromLeft ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  viewport={{ once: false }}
                >
                  <ListItem 
                    sx={{ 
                      py: 1, 
                      px: 0,
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateX(8px)",
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <NumberIcon>{idx + 1}</NumberIcon>
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ 
                        color: "text.secondary",
                        sx: {
                          transition: "color 0.2s",
                          "&:hover": {
                            color: "white",
                          }
                        }
                      }} 
                    />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </RoadmapCard>
        </motion.div>
      </Box>
    </Box>
  );
};

// Main Roadmap Component
const RoadmapSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const roadmapData = [
    {
      phase: "Pre-Sale & Liquidity",
      title: "Genesis Minting",
      allocation: "50% – 5,000,000 Tokens",
      percentage: 10,
      items: [
        "Minting the first 500 unique Thai.Coin NFTs.",
        "Exclusive access for early supporters and whitelist members.",
        "Unveiling our legendary NFT characters to the world.",
        "Initiation of the Thai.Coin community."
      ],
      active: true,
    },
    {
      phase: "Staking & Rewards",
      title: "Stake & Reward",
      allocation: "20% – 2,000,000 Tokens",
      percentage: 25,
      items: [
        "Introducing $THAI as our utility token for staking.",
        "Staking platform launch with enticing rewards for participants.",
        "Building a vibrant and engaged Thai.Coin staking community.",
        "Continuous development for enhanced staking experiences."
      ],
    },
    {
      phase: "Marketing & Growth",
      title: "Ecosystem Expansion",
      allocation: "15% – 1,500,000 Tokens",
      percentage: 15,
      items: [
        "Used for influencer partnerships, social media promotions, and exchange listings.",
        "Community-building initiatives including giveaways, airdrops, and special campaigns.",
        "Strategic collaborations to boost adoption and utility.",
        "Global marketing strategy to expand Thai.Coin's reach and user base."
      ],
    },
    {
      phase: "Reserve & Buybacks",
      title: "Web3 Integration",
      allocation: "10% – 1,000,000 Tokens",
      percentage: 30,
      items: [
        "Strategic reserves for token buybacks, ensuring price support when needed.",
        "Buybacks funded through ecosystem revenue, increasing token demand over time.",
        "Flexibility for future project expansions and developments.",
        "Creates sustainable tokenomics model with built-in price stability mechanisms."
      ],
    },
    {
      phase: "Founder Rewards",
      title: "Global Expansion",
      allocation: "5% – 500,000 Tokens",
      percentage: 20,
      items: [
        "Rewards for the core team and early contributors to Thai.Coin.",
        "Tokens vested over time to ensure alignment with long-term project success.",
        "Team commitment to Thai.Coin's vision, ensuring continuous growth.",
        "Strategic allocation to incentivize sustainable development and innovation."
      ],
    },
  ];

  // Background particles
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 3 + 1}px`,
    opacity: Math.random() * 0.5,
  }));

  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        {/* Background particles */}
        {particles.map((particle, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: particle.width,
              height: particle.height,
              backgroundColor: "white",
              borderRadius: "50%",
              opacity: particle.opacity,
              top: particle.top,
              left: particle.left,
            }}
          />
        ))}
        
        {/* Gradient overlays */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 20% 30%, rgba(0, 255, 157, 0.03) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 80% 70%, rgba(255, 235, 59, 0.03) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <Box sx={{ textAlign: "center", mb: 8, position: "relative" }}>
              <Typography 
                variant="h6" 
                color="primary" 
                sx={{ 
                  mb: 1, 
                  textTransform: "uppercase", 
                  fontWeight: "bold",
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 64,
                    height: 4,
                    backgroundColor: "#00ff9d",
                    borderRadius: 2,
                  }
                }}
              >
                EMBARK ON THE THAI.COIN ADVENTURE
              </Typography>
              
              <Typography 
                variant="h3" 
                color="white" 
                sx={{ 
                  mt: 4, 
                  mb: 6, 
                  fontWeight: "bold",
                  textShadow: "0 0 8px rgba(0, 255, 157, 0.3)"
                }}
              >
                UNVEILING THE ROAD TO WEB3 EXCELLENCE
              </Typography>
            </Box>
          </motion.div>

          {/* Roadmap Timeline */}
          <Box sx={{ position: "relative" }}>
            {/* Timeline vertical line */}
            <TimelineLine />

            {/* Roadmap Items */}
            <Stack spacing={12} sx={{ position: "relative", zIndex: 10 }}>
              {roadmapData.map((item, index) => (
                <RoadmapItem 
                  key={index}
                  {...item}
                  index={index} 
                />
              ))}
            </Stack>
            
            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <Box 
                sx={{ 
                  mt: 12, 
                  pt: 8, 
                  textAlign: "center",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 120,
                    height: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }
                }}
              >
                <Typography 
                  variant="h4" 
                  color="primary" 
                  sx={{ 
                    mb: 4, 
                    fontWeight: "bold" 
                  }}
                >
                  HOW IT WORKS
                </Typography>
                
                <List sx={{ maxWidth: 800, mx: "auto" }}>
                  {[
                    {
                      step: 1,
                      content: "<strong>Early investors</strong> acquire tokens during the pre-sale, helping raise initial liquidity."
                    },
                    {
                      step: 2,
                      content: "<strong>Staking rewards</strong> encourage holders to keep their tokens, reducing sell pressure."
                    },
                    {
                      step: 3,
                      content: "<strong>Marketing funds</strong> drive adoption, increasing demand and value."
                    },
                    {
                      step: 4,
                      content: "<strong>Buybacks & reserves</strong> support price stability and future growth."
                    },
                    {
                      step: 5,
                      content: "<strong>Founder tokens</strong> are vested to align with long-term success."
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100 
                      }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      <ListItem sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: "primary.main", 
                            color: "black", 
                            fontWeight: "bold",
                            mr: 2,
                            boxShadow: "0 0 10px rgba(0, 255, 157, 0.4)"
                          }}
                        >
                          {item.step}
                        </Avatar>
                        <Typography 
                          color="text.secondary"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </ListItem>
                    </motion.div>
                  ))}
                </List>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: false }}
                >
                  <Typography 
                    variant="body1" 
                    color="white" 
                    sx={{ 
                      mt: 4, 
                      fontWeight: "medium",
                      maxWidth: 800,
                      mx: "auto"
                    }}
                  >
                    This model ensures Thai.Coin remains sustainable while providing passive income, 
                    strong liquidity, and a growing ecosystem. 
                    <Typography 
                      component="span" 
                      sx={{ 
                        display: "inline-block", 
                        ml: 1,
                        fontSize: "1.5rem"
                      }}
                    >
                      🚀
                    </Typography>
                  </Typography>
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </GradientBackground>
    </ThemeProvider>
  );
};

export default RoadmapSection;