import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// @mui
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
} from "@mui/icons-material";
import { ColorModeContext, getColors } from "../Theme/themes";

import { motion } from "framer-motion";
import "./style.css"

interface HeaderProps {
  setIsSidebarOpen: () => void;
  APP_BAR: string
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, APP_BAR }) => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme()
  const [isOn, setIsOn] = useState(false);
  const navigate = useNavigate()
  if (!colorMode) {
    return null;
  }

  const toggleSwitch = () => {
    colorMode.toggleColorMode()
    setIsOn(!isOn);
  }

  return (
    <AppBar sx={{
      backgroundColor: getColors().secondary[900],
      height: APP_BAR
    }} >
      <Toolbar>

        <IconButton
          onClick={() => setIsSidebarOpen()}
          sx={{
            mt: 2,
            color: getColors().blueAccent[100]
          }}
        >
          <MenuIcon />
          {/* <img src={`/Images/main-menu.png`} alt="logo" className="w-8 h-8 ml-4" /> */}
        </IconButton>
        <Box
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer", mt: 2 }}
        >
          <img src={`/logo.svg`} alt="logo" className="w-8 h-8 ml-4" />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          sx={{
            mt: 1
          }}
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <div className="switch" data-ison={isOn} onClick={toggleSwitch} style={{
            background: theme.palette.grey[900],
            border: "2px solid",
            borderColor: theme.palette.grey[100],
          }}>
            <motion.div className="handle" layout transition={spring} style={{
              background: theme.palette.grey[100],
            }} />
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};


export default Header;