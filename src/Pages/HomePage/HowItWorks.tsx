import React from 'react';
import { Avatar, Box, List, ListItem, Typography, useTheme } from '@mui/material';
import { motion } from "framer-motion";

const HowItWorks: React.FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  return (
    <Box sx={{ 
      backgroundColor: isDarkMode ? 'rgba(13, 17, 23, 0.7)' : 'transparent',
      borderRadius: 2,
      p: { xs: 2, md: 4 },
      backdropFilter: isDarkMode ? 'blur(10px)' : 'none',
      boxShadow: isDarkMode ? '0 8px 32px rgba(0, 255, 157, 0.1)' : 'none',
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
              textShadow: isDarkMode ? '0 0 15px rgba(0, 255, 157, 0.5)' : 'none',
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
                    backgroundColor: isDarkMode ? 'rgba(22, 27, 34, 0.6)' : 'transparent',
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(8px)",
                      backgroundColor: isDarkMode ? 'rgba(26, 32, 44, 0.8)' : 'rgba(0, 255, 157, 0.05)'
                    }
                  }}
                >
                  <Avatar
                    sx={{ 
                      bgcolor: "primary.main", 
                      fontWeight: "bold",
                      mr: 2,
                      boxShadow: isDarkMode ? "0 0 15px rgba(0, 255, 157, 0.6)" : "0 0 10px rgba(0, 255, 157, 0.4)",
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
                    color={isDarkMode ? "rgba(255, 255, 255, 0.9)" : "text.secondary"}
                    sx={{
                      transition: "color 0.3s ease",
                      "& strong": {
                        color: theme.palette.primary.main,
                        fontWeight: "bold"
                      },
                      "&:hover": {
                        color: isDarkMode ? "white" : "text.primary"
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
                mt: 4, 
                fontWeight: "medium",
                maxWidth: 800,
                mx: "auto",
                p: 2,
                borderRadius: 2,
                backgroundColor: isDarkMode ? 'rgba(0, 255, 157, 0.07)' : 'transparent',
                color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'text.primary',
                transition: "all 0.4s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  backgroundColor: isDarkMode ? 'rgba(0, 255, 157, 0.1)' : 'transparent'
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
                  filter: isDarkMode ? "drop-shadow(0 0 8px rgba(0, 255, 157, 0.7))" : "none",
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
  );
};

export default HowItWorks;