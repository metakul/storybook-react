import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSwipeable } from "react-swipeable";

import Header from "./TopBar";

import "./global.css";
import MiniDrawer from "./Navigation";
import navConfig from "./navConfig";

// home page tabs
import { Outlet } from "react-router-dom";


import Footer from "./Footer";
import { getColors } from "./Theme/themes";

export default function DashboardLayout() {
  const isNonMobile = useMediaQuery("(min-width: 768px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [, setShowOutlet] = useState<boolean>(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true); 
  const APP_BAR = "64px";
    // Show "Swipe Right" hint for 3 seconds on mobile
    useEffect(() => {
      if (!isNonMobile) {
        setTimeout(() => {
          setShowSwipeHint(false);
        }, 3000);
      }
      else{
        setShowSwipeHint(false);
        
      }
    }, [isNonMobile]);

  const handleSideBarState = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

    // Detect left-to-right swipe (for opening the sidebar)
    const swipeHandlers = useSwipeable({
      onSwipedRight: () => {
        if (!isNonMobile) setIsSidebarOpen(true); // Open drawer on swipe
      },
      onSwipedLeft: () => {
        if (!isNonMobile) setIsSidebarOpen(false); // Close drawer on swipe left
      },
      trackTouch: true,
      trackMouse: false,
    });
  return (
    <Box {...swipeHandlers} sx={{ overflow: "hidden", position: "relative" }}>
              {/* Swipe Right Hint */}
      {showSwipeHint && (
        <Box
          sx={{
            position: "absolute",
            top: "600px",
            left: "10px",
            transform: "translateY(-50%)",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            opacity: 0.9,
            animation: "swipeAnimation 1s ease-in-out infinite alternate, fadeOut 4s ease-in-out",
          }}
        >
          👉 Swipe for menu
        </Box>
      )}
          <Header
            APP_BAR={APP_BAR}
            isNonMobile={isNonMobile}
            setIsSidebarOpen={handleSideBarState}
          />
          <MiniDrawer
            APP_BAR={APP_BAR}
            setShowOutlet={setShowOutlet}
            isNonMobile={isNonMobile}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={handleSideBarState}
            navConfig={navConfig}
          />
          <Box
            sx={{
              mt: 8,
              pl:isNonMobile ? 12 : 0,
              background: `linear-gradient(135deg, ${getColors().yellowAccent[600]} 0%,${getColors().yellowAccent[400]} 50%, ${getColors().yellowAccent[600]} 100%)`,

            }}
          >
            <Outlet />
          <Footer />
          </Box>
          <style>
        {`
          @keyframes swipeAnimation {
            0% { transform: translateY(-50%) translateX(0px); }
            100% { transform: translateY(-50%) translateX(20px); }
          }
          
          @keyframes fadeOut {
            0% { opacity: 1; }
            90% { opacity: 0.5; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
}
