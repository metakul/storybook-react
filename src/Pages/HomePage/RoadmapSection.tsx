import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Box, 
  Typography, 
  Stack,
  Container,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { getColors } from "../../layout/Theme/themes";
import { GradientBackground, TimelineLine } from "./CustomMuiStyle";
import RoadmapItem from "./RoadmapItems";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { ParticleBackground } from '../HomePage/ParticleBackground';

// Main Roadmap Component
const RoadmapSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDarkMode = theme.palette.mode === 'dark';
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
  }, []);
  
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
      completed: true
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
      active: true,
      completed: false
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
      active: false,
      completed: false
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
      active: false,
      completed: false
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
      active: false,
      completed: false
    },
  ];

  return (
    <Box 
      sx={{
        background: isDarkMode 
          ? `linear-gradient(135deg, ${getColors().yellowAccent[100]} 0%, #FFF9C4 50%, ${getColors().yellowAccent[300]} 100%)`
          : `linear-gradient(135deg, ${getColors().yellowAccent[100]} 0%, #FFF9C4 50%, ${getColors().yellowAccent[300]} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 16 },
        minHeight: '100vh',
        color: isDarkMode ? '#FFF' : 'inherit'
      }}
    >
      {/* Use ParticleBackground component for consistency with HomePage1 */}
      <ParticleBackground />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        {/* Title Section with enhanced animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: animate ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 8, md: 12 }, position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : -30 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Typography 
                variant="overline" 
                sx={{ 
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 'bold',
                  color: isDarkMode ? '#1A237E' : '#1A237E',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  display: 'block',
                  mb: 1
                }}
              >
                THAI.COIN FUTURE VISION
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: animate ? 1 : 0, scale: animate ? 1 : 0.9 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 800,
                  color: isDarkMode ? '#000' : '#000',
                  lineHeight: 1.1,
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                  mb: { xs: 2, md: 4 },
                  fontFamily: '"BakBak One", "Roboto", sans-serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                Our Roadmap to Success
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                  color: isDarkMode ? '#424242' : '#424242',
                  mb: { xs: 4, md: 6 },
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                Follow the journey of Thai.Coin as we build the premier Real Estate crypto ecosystem in Thailand
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        {/* Roadmap Timeline with enhanced styling */}
        <Box sx={{ position: "relative" }}>
          {/* Timeline vertical line with glow effect */}
          <Box 
            sx={{ 
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: "4px",
              backgroundColor: "#FFD700",
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.7)",
              transform: "translateX(-50%)",
              zIndex: 5,
              display: { xs: "none", md: "block" }
            }}
          />

          {/* Animated dots on timeline */}
          {[0, 0.25, 0.5, 0.75, 1].map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.8 + (index * 0.2),
                type: "spring"
              }}
              style={{ 
                position: "absolute",
                top: `${position * 100}%`,
                left: "50%",
                width: isMobile ? 0 : 20,
                height: isMobile ? 0 : 20,
                backgroundColor: "#FFD700",
                borderRadius: "50%",
                boxShadow: "0 0 15px rgba(255, 215, 0, 0.8)",
                transform: "translate(-50%, -50%)",
                zIndex: 6,
                display: isMobile ? "none" : "block"
              }}
            />
          ))}

          {/* Roadmap Items - enhanced for RoadmapItems.tsx */}
          <Stack spacing={16} sx={{ position: "relative", zIndex: 10 }}>
            {roadmapData.map((item, index) => (
              <RoadmapItem
                key={index}
                {...item}
                index={index} 
              />
            ))}
          </Stack>
          
          {/* Final call to action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <Box 
              sx={{ 
                textAlign: "center", 
                mt: 16, 
                py: 6,
                px: 4,
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                maxWidth: "800px",
                mx: "auto"
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: "bold", 
                  mb: 3,
                  fontFamily: '"BakBak One", "Roboto", sans-serif',
                  color: 'inherit',
                }}
              >
                Join Us on This Exciting Journey
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4,
                  color: 'inherit'
                }}
              >
                Thai.Coin is more than just a cryptocurrency - it's a revolution in Real Estate investment and community building in Thailand.
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box 
                  component="button"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    py: 1.5,
                    px: 4,
                    borderRadius: 6,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    backgroundColor: '#FFD700',
                    color: '#000',
                    border: "none",
                    cursor: "pointer",
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 215, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    mx: "auto",
                    "&:hover": {
                      backgroundColor: '#FFC400',
                      boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2), 0 0 30px rgba(255, 215, 0, 0.4)',
                    },
                  }}
                >
                  <span>Join Thai.Coin Now</span>
                  <ArrowCircleRightIcon />
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default RoadmapSection;