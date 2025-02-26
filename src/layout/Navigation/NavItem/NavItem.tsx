import React from "react";
import { ListItemText, ListItem, ListItemButton, ListItemIcon, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getColors } from "../../Theme/themes";
import { ChevronRightOutlined } from "@mui/icons-material";
 
interface NavItemProps {
    item: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    };
    isSidebarOpen: boolean;
    isNonMobile: boolean;
    setShowOutlet: (showOutlet: boolean) => void;
    active: string;
    setActive: (to: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({ item, isSidebarOpen, setShowOutlet, active, setActive }) => {
    const { text, icon, to } = item;
    const navigate = useNavigate();
    
    const handleClick = () => {
        setShowOutlet(true); 
        setActive(to);
        navigate(to);
    };

    return (
        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <Box onClick={icon ? handleClick : undefined} sx={{ cursor: "pointer" }}>
                <ListItemButton
                    onClick={handleClick}
                    sx={{
                        minHeight: 48,
                        justifyContent: isSidebarOpen ? 'initial' : 'center',
                        px: 2.5,
                        backgroundColor: active === to ? getColors().yellowAccent[900] : "transparent",
                        color: active === to ? getColors().secondary[900] : getColors().secondary[100],
                    }}
                >
                    {icon && (
                        <ListItemIcon sx={{ minWidth: 0, mr: isSidebarOpen ? 3 : 'auto', justifyContent: 'center',
                        color: active === to ? getColors().secondary[900] : getColors().secondary[100],

                         }}>
                            {icon}
                        </ListItemIcon>
                    )}
                    <ListItemText primary={text} sx={{ opacity: isSidebarOpen ? 1 : 0 }} />
                    {active === to && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                </ListItemButton>
            </Box>
        </ListItem>
    );
};

export default NavItem;
