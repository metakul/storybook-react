import React from 'react';
import { Avatar, Box, List, ListItem, Typography } from '@mui/material';

import { motion } from "framer-motion";


const HowItWorks: React.FC = () => {
  return (
    <Box sx={{ }}>
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
  );
};

export default HowItWorks;