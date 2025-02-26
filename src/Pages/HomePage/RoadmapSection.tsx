import React from "react";
import { motion } from "framer-motion";
import { 
  Box, 
  Typography, 
  Stack, 
} from "@mui/material";
import { getColors } from "../../layout/Theme/themes";
import { GradientBackground, TimelineLine } from "./CustomMuiStyle";
import RoadmapItem from "./RoadmapItems";

// Main Roadmap Component
const RoadmapSection: React.FC = () => {
  
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
  const particles = Array.from({ length: 50 }).map((_, _i) => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 3 + 1}px`,
    height: `${Math.random() * 3 + 1}px`,
    opacity: Math.random() * 0.5,
  }));

  return (
      <GradientBackground sx={{
        background:getColors().yellowAccent[200]

      }}>
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
        <Box  sx={{ position: "relative", zIndex: 1,
         }}>
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.5,  // Increased from 0.8 to 1.5
              ease: "easeOut" 
            }}
            viewport={{ once: false, amount: 0.2 }}  // Lower amount for earlier trigger
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
          </Box>
        </Box>
      </GradientBackground>
  );
};

export default RoadmapSection;