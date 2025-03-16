import { useNavigate } from 'react-router-dom';
import "../styles/Navbar.css";
import coverCleverLogo from "../assets/covercleverlogo.png"; // Import the logo
import { Tooltip } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

// import { Link } from "react-router-dom";
import { User } from '../types/User';

interface NavBarProps {
  user?: User | null; // User object or null
  title?: string;
  //onLogout?: () => void; // Callback for logout
}

export const Navbar: React.FC<NavBarProps> = (props) => {

    const navigate = useNavigate();

    const handleAccountSettingsOpen = () => {
        navigate('/profile'); // Navigate to settings page
    };

    const handleAddInsurance = () => {
        navigate('/score'); // Navigate to settings page
    };

    const handleGoHome = () => {
        navigate('/'); // Navigate to home page
    }

    const handleOpenInNewTab = () => {
        // open the webpage Calvin set up
    }

    return (
        <AppBar position="static">
            <Toolbar style={{ 
                justifyContent: "space-between",
                //padding: "0 16px"  // Increased padding
            }}>
                {/* Left side - Logo and Name */}
                <Box display="flex" alignItems="center" paddingLeft={1}>
                    <Box className="navbar-logo"
                        component="img"
                        sx={{
                            height: "32px",
                            width: "auto",
                            objectFit: "contain",
                            userSelect: "none", /* Prevents text/image selection */
                            webkitUserDrag: "none", /* Prevents dragging in webkit browsers */
                            webkitUserSelect: "none", /* Safari specific */
                            mozUserSelect: "none", /* Firefox specific */
                            msUserSelect: "none", /* IE/Edge specific */
                            pointerEvents: "none" /* Prevents all click/drag events */
                        }}
                        alt="Cover Clever Logo" 
                        src={coverCleverLogo}
                    />
                    <Typography 
                            variant="h6" 
                            className="navbar-title"
                            sx={{ 
                                marginLeft: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                color: 'white',
                                userSelect: 'none'
                            }}
                        >
                            {props.title}
                    </Typography>
                </Box>
                
                {/* Right side - Icons */}
                <Box display="flex" alignItems="center" gap={1}>
                    <IconButton
                        onClick={handleGoHome}
                        color="inherit"
                        aria-label="open home page"
                    >
                        <Tooltip title="Open home page">
                            <HomeIcon />
                        </Tooltip>
                        
                    </IconButton>
                    <IconButton
                        onClick={handleOpenInNewTab}
                        color="inherit"
                        aria-label="open in new tab"
                    >
                        <Tooltip title="Open web application">
                            <OpenInNewIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        onClick={handleAddInsurance}
                        color="inherit"
                        aria-label="open in new tab"
                    >
                        <Tooltip title="Add a health insurance">
                            <AddBoxIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        onClick={handleAccountSettingsOpen}
                        color="inherit"
                        aria-label="account settings"
                    >
                        <Tooltip title="Open account settings">
                            <ManageAccountsIcon />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};