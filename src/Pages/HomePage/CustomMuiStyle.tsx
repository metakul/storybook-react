

// Styled components

import { 
    Box, 
    Typography, 
    Paper, 
    Avatar,
    styled,
  } from "@mui/material";
import { getColors } from "../../layout/Theme/themes";

export const GradientBackground = styled(Box)({
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
});

export const TimelineLine = styled(Box)({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  width: "6px",
  height: "100%",
  backgroundColor: "#00ff9d",
  opacity: 0.5,
  boxShadow: "0 0 15px rgba(0, 255, 157, 0.3)",
});

export const PercentageHighlight = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  fontSize: "2rem",
  textShadow: "0 0 2px rgba(0, 255, 157, 0.5)",
}));

export const RoadmapCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  border: "2px solid rgba(0, 255, 157, 0.4)",
  backdropFilter: "blur(10px)",
  boxShadow: theme.shadows[10],
  width: "90%",
  maxWidth: "450px",
  position: "relative",
  zIndex: 10,
  background:getColors().secondary[800]
}));

export const NumberIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "black",
  width: 24,
  height: 24,
  fontSize: "0.75rem",
  fontWeight: 700,
  boxShadow: "0 0 8px rgba(0, 255, 157, 0.4)",
}));