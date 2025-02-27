import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavItem from './NavItem/NavItem';
import { CustomDrawer, DrawerHeader } from './style.css';
import { SwipeableDrawer } from '@mui/material';
import { getColors } from '../Theme/themes';
import MenuIcon from '@mui/icons-material/Menu';

export interface MiniDrawerProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: () => void;
    setShowOutlet: (showOutlet: boolean) => void;
    isNonMobile: boolean;
    navConfig: {
        text: string;
        icon: React.ReactNode | null;
        to: string;
    }[];
    APP_BAR: string;
}

const MiniDrawer: React.FC<MiniDrawerProps> = ({ setIsSidebarOpen, isNonMobile, isSidebarOpen, navConfig, setShowOutlet }) => {
    const [active, setActive] = React.useState("");

    return (
        <>
            {isNonMobile ? (
                <CustomDrawer   ModalProps={{
                    keepMounted: false,
                  }} PaperProps={{
                    sx: {
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      marginTop: "90px",
                      marginLeft: 0.5,
                      borderRadius: 4,
                      height: "85%",
                      paddingBottom:"40px",
                      background: getColors().yellowAccent[200] 
        
                    },
                  }} variant="permanent" open={isSidebarOpen}>
                    <DrawerHeader>
                        <IconButton onClick={setIsSidebarOpen}>
                            <MenuIcon />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {navConfig.map((item, index) => (
                            <NavItem
                                key={index}
                                isNonMobile={isNonMobile}
                                item={item}
                                isSidebarOpen={isSidebarOpen}
                                setShowOutlet={setShowOutlet}
                                active={active}
                                setActive={setActive}
                            />
                        ))}
                    </List>
                    <Divider />
                    {isSidebarOpen && (
                        <DrawerHeader>
                            <IconButton onClick={setIsSidebarOpen}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </DrawerHeader>
                    )}
                    <Divider />
                </CustomDrawer>
            ) : (
                <SwipeableDrawer
                ModalProps={{
                    keepMounted: false,
                  }}
                  PaperProps={{
                    sx: {
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      marginTop: "75px",
                      marginLeft: 1,
                      borderRadius: 4,
                      height: "85%",
                      paddingBottom:"40px",
                      background: getColors().yellowAccent[200] 
        
                    },
                  }}
                    variant="persistent"
                    open={isSidebarOpen}
                    onClose={(event) => console.log(event)}
                    onOpen={(event) => console.log(event)}
                >
                    <Divider />
                    <List>
                        {navConfig.map((item, index) => (
                            <NavItem
                                key={index}
                                isNonMobile={isNonMobile}
                                item={item}
                                isSidebarOpen={isSidebarOpen}
                                setShowOutlet={setShowOutlet}
                                active={active}
                                setActive={setActive}
                            />
                        ))}
                    </List>
                    <Divider />
                </SwipeableDrawer>
            )}
        </>
    );
};

export default MiniDrawer;
