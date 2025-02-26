import React from 'react';
import { Avatar, Box, List, ListItem, Typography, useTheme } from '@mui/material';
import { motion } from "framer-motion";
import { ParticleBackground } from './ParticleBackground';
import { getColors } from "../../layout/Theme/themes";

const HowItWorks: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{ 
      background: `linear-gradient(135deg, ${getColors().yellowAccent[100]} 0%, #FFF9C4 50%, ${getColors().yellowAccent[300]} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      py: { xs: 8, md: 12 },
      minHeight: '80vh'
    }}>
      {/* Use ParticleBackground for consistency with Homepage1 */}
      <ParticleBackground />
      
      <Box sx={{ 
        backgroundColor: 'transparent',
        borderRadius: 2,
        p: { xs: 2, md: 4 },
        position: 'relative',
        zIndex: 1
      }}>
        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2,
            ease: "easeOut"
          }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <Box 
            sx={{ 
              mt: 12, 
              textAlign: "center",
              position: "relative",
            }}
          >
            <Typography
              variant="h4" 
              color="primary" 
              sx={{ 
                mb: 4, 
                fontWeight: "bold",
                color: isDarkMode ? '#1A237E' : 'primary.main',
                textShadow: 'none',
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
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 80,
                    damping: 12,
                    duration: 0.9
                  }}
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <ListItem 
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)',
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateX(8px)",
                        backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.6)'
                      }
                    }}
                  >
                    <Avatar
                      sx={{ 
                        bgcolor: "primary.main", 
                        fontWeight: "bold",
                        mr: 2,
                        boxShadow: "0 0 10px rgba(0, 255, 157, 0.4)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 0 20px rgba(0, 255, 157, 0.8)",
                          transform: "scale(1.1)"
                        }
                      }}
                    >
                      {item.step}
                    </Avatar>
                    <Typography 
                      color={"black" }
                      sx={{
                        transition: "color 0.3s ease",
                        "& strong": {
                          color: "black",
                          fontWeight: "bold"
                        },
                        "&:hover": {
                          color: isDarkMode ? "text.primary" : "text.primary"
                        }
                      }}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </ListItem>
                </motion.div>
              ))}
            </List>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.6,
                duration: 0.9,
                ease: "easeOut"
              }}
              viewport={{ once: false, amount: 0.6 }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  color:"black",
                  mt: 4, 
                  fontWeight: "medium",
                  maxWidth: 800,
                  mx: "auto",
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                  // color: isDarkMode ? 'text.primary' : 'text.primary',
                  transition: "all 0.4s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                This model ensures Thai.Coin remains sustainable while providing passive income, 
                strong liquidity, and a growing ecosystem. 
                <Typography 
                  component="span" 
                  sx={{ 
                    display: "inline-block", 
                    ml: 1,
                    fontSize: "1.5rem",
                    filter: "none",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: "scale(1.4) rotate(10deg)"
                    }
                  }}
                >
                  🚀
                </Typography>
              </Typography>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default HowItWorks;