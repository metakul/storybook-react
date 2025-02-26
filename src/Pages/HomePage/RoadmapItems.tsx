import React from "react";
import { motion } from "framer-motion";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Paper, Chip, useTheme, useMediaQuery } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import { getColors } from "../../layout/Theme/themes";

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
  const isDarkMode = theme.palette.mode === 'dark';
  
  // Determine if the item should come from left or right based on index
  const isFromLeft = index % 2 === 0;
  
  // Calculate year/quarter from index for display
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const year = 2025 + Math.floor(index / 4);
  const quarter = quarters[index % 4];

  // Enhanced animations based on active/completed status
  const cardVariants = {
    initial: { 
      opacity: 0, 
      x: isFromLeft ? (isMobile ? 0 : -100) : (isMobile ? 0 : 100),
      y: isMobile ? 50 : 0,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        duration: 1.5,
        bounce: 0.25,
        stiffness: 80,
        delay: 0.2
      }
    }
  };

  // Item list animation variants
  const itemVariants = {
    initial: { opacity: 0, x: isFromLeft ? -20 : 20 },
    animate: (i: number) => ({
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        delay: 0.5 + (i * 0.15)
      }
    })
  };

  // Status indicator animation
  const indicatorVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 1
      }
    }
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: isMobile ? "center" : (isFromLeft ? "flex-start" : "flex-end"),
        width: "100%",
        position: "relative",
      }}
    >
      {/* Timeline connecting element (only on desktop) */}
      {!isMobile && (
        <Box
          component={motion.div}
          initial={{ width: 0 }}
          whileInView={{ width: "50px" }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: false, amount: 0.4 }}
          sx={{
            position: "absolute",
            left: isFromLeft ? "calc(50% - 50px)" : "50%",
            top: 35,
            height: "4px",
            backgroundColor: active ? "#FFD700" : "rgba(255, 215, 0, 0.5)",
            boxShadow: active ? "0 0 10px rgba(255, 215, 0, 0.5)" : "none",
            zIndex: 5,
          }}
        />
      )}
      
      {/* Timeline status indicator */}
      {!isMobile && (
        <motion.div
          variants={indicatorVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.4 }}
          style={{
            position: "absolute",
            left: "50%",
            top: 35,
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          {completed ? (
            <Chip 
            size="small"
            label={"Completed"}
            sx={{
              backgroundColor: completed 
                ? isDarkMode ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.2)"
                : isDarkMode ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 215, 0, 0.2)",
              color: completed 
                ? isDarkMode ? "#81C784" : "#2E7D32"
                : isDarkMode ? "#FFE082" : "#F57F17",
              fontWeight: "bold",
            }}
          />
          ) : active ? (
            <Chip 
            size="small"
            label={"In Progress"}
            sx={{
              backgroundColor: completed 
                ? isDarkMode ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.2)"
                : isDarkMode ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 215, 0, 0.2)",
              color: completed 
                ? isDarkMode ? "#81C784" : "#2E7D32"
                : isDarkMode ? "#FFE082" : "#F57F17",
              fontWeight: "bold",
            }}
          />
          ) : (
              <Chip 
                size="small"
                label={"In Progress"}
                sx={{
                  backgroundColor: completed 
                    ? isDarkMode ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.2)"
                    : isDarkMode ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 215, 0, 0.2)",
                  color: completed 
                    ? isDarkMode ? "#81C784" : "#2E7D32"
                    : isDarkMode ? "#FFE082" : "#F57F17",
                  fontWeight: "bold",
                }}
              />
          )}
        </motion.div>
      )}
      
      {/* Card with enhanced styling and animation */}
      <Box 
        sx={{ 
          width: { xs: "100%", md: "45%" }, 
          pr: isFromLeft && !isMobile ? 4 : 0,
          pl: !isFromLeft && !isMobile ? 4 : 0,
        }}
      >
        <motion.div
          variants={cardVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: false, amount: 0.2 }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              position: "relative",
              overflow: "hidden",
              borderLeft: `6px solid ${active ? "#FFD700" : completed ? "#4CAF50" : "rgba(255, 215, 0, 0.4)"}`,
              transition: "all 0.5s ease",
              background: isDarkMode 
                ? "rgba(30, 30, 35, 0.85)" 
                : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(10px)",
              boxShadow: active 
                ? isDarkMode
                  ? "0 15px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2)"
                  : "0 15px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.2)"
                : isDarkMode
                  ? "0 10px 20px rgba(0, 0, 0, 0.2)"
                  : "0 10px 20px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                boxShadow: isDarkMode
                  ? "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3)"
                  : "0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(255, 215, 0, 0.3)",
                transform: "translateY(-8px)",
              },
            }}
          >
            {/* Background decoration */}
            <Box 
              sx={{ 
                position: "absolute", 
                right: -30, 
                top: -30, 
                width: 120, 
                height: 120, 
                borderRadius: "50%", 
                backgroundColor: isDarkMode 
                  ? "rgba(255, 215, 0, 0.05)"
                  : "rgba(255, 215, 0, 0.1)",
                zIndex: 0
              }}
            />

            {/* Phase badge */}
            <Chip 
              label={phase}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                backgroundColor: getColors().yellowAccent[isDarkMode ? 800 : 300],
                color: isDarkMode ? "#FFF" : "#000",
                fontWeight: "bold",
                boxShadow: isDarkMode 
                  ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                  : "0 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 2
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3, zIndex: 1, position: "relative" }}>
              <Box>
                <Typography
                  variant="h5" 
                  sx={{ 
                    fontWeight: "bold",
                    fontFamily: '"BakBak One", "Roboto", sans-serif',
                    color: isDarkMode ? "#FFF" : "#000",
                    mb: 1
                  }}
                >
                  {title}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: "medium",
                      color: isDarkMode ? "#AAA" : "#424242",
                      backgroundColor: isDarkMode 
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1
                    }}
                  >
                    {quarter} {year}
                  </Typography>
                  
                  {(active || completed) && (
                    <Chip 
                      size="small"
                      label={completed ? "Completed" : "In Progress"}
                      sx={{
                        backgroundColor: completed 
                          ? isDarkMode ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.2)"
                          : isDarkMode ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 215, 0, 0.2)",
                        color: completed 
                          ? isDarkMode ? "#81C784" : "#2E7D32"
                          : isDarkMode ? "#FFE082" : "#F57F17",
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </Box>
              </Box>
              
              <Box 
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FFD700",
                  color: "#000",
                  fontWeight: "bold",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  boxShadow: isDarkMode
                    ? "0 4px 15px rgba(255, 215, 0, 0.6)"
                    : "0 4px 15px rgba(255, 215, 0, 0.4)",
                  zIndex: 1
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", lineHeight: 1 }}>
                  {percentage}
                </Typography>
                <Typography variant="caption" sx={{ lineHeight: 1 }}>
                  %
                </Typography>
              </Box>
            </Box>

            <Typography 
              variant="body2" 
              sx={{ 
                mb: 3,
                color: isDarkMode ? "#CCC" : "#555",
                fontWeight: "medium"
              }}
            >
              {allocation}
            </Typography>

            <List disablePadding>
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={itemVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false, amount: 0.6 }}
                >
                  <ListItem
                    sx={{ 
                      py: 1, 
                      px: 0,
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateX(8px)",
                        backgroundColor: isDarkMode 
                          ? "rgba(255, 215, 0, 0.08)"
                          : "rgba(255, 215, 0, 0.1)",
                        borderRadius: 1,
                      }
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <ArrowRightAltIcon sx={{ color: getColors().yellowAccent[isDarkMode ? 400 : 700] }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item} 
                      primaryTypographyProps={{ 
                        color: isDarkMode ? "text.secondary" : "text.primary",
                        fontSize: "0.95rem",
                        sx: {
                          transition: "color 0.3s",
                          "&:hover": {
                            color: isDarkMode ? "#FFF" : "#000",
                          }
                        }
                      }} 
                    />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Paper>
        </motion.div>
      </Box>
    </Box>
  );
};

export default RoadmapItem;