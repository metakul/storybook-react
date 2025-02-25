import { motion } from "framer-motion";

import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { getColors } from "../../layout/Theme/themes";
import { NumberIcon, PercentageHighlight, RoadmapCard } from "./CustomMuiStyle";


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
    // phase,
    title,
    allocation,
    percentage,
    items,
    completed,
    active,
    index,
  }) => {
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
                    backgroundColor: getColors().grey[800],
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


export default RoadmapItem;