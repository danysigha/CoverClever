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

import { User } from '../types/User';

/**
 * Props interface for the Navbar component
 * @interface NavBarProps
 * @property {User | null} [user] - Optional user object or null
 * @property {string} [title] - Optional title to display in the navbar
 */
interface NavBarProps {
  user?: User | null; // Optional User object or null
  title?: string;
}

/**
 * Navbar component that displays the application header with navigation controls
 * 
 * @component
 * @param {NavBarProps} props - Component props
 * @returns {JSX.Element} Rendered Navbar component
 */
export const Navbar: React.FC<NavBarProps> = (props) => {

    const navigate = useNavigate();

    /**
     * Handles navigation to the profile/account settings page
     */
    const handleAccountSettingsOpen = () => {
        navigate('/profile'); // Navigate to profile settings page
    };

    /**
     * Handles navigation to the insurance scoring page
     */
    const handleAddInsurance = () => {
        navigate('/score'); // Navigate to insurance scoring page
    };

    /**
     * Handles navigation back to the home page
     */
    const handleGoHome = () => {
        navigate('/'); // Navigate to home page
    }

    /**
     * Placeholder function to open the application in a new tab
     * @todo Implement functionality to open Calvin's webpage
     */
    const handleOpenInNewTab = () => {
        // open the webpage Calvin set up
    }

    return (
        <AppBar position="static">
            <Toolbar style={{ 
                justifyContent: "space-between",
            }}>
                {/* Left side - Logo and Name */}
                <Box display="flex" alignItems="center" paddingLeft={1}>
                    {/* Logo Image with CSS to prevent dragging/selection */}
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
                    {/* Application Title */}
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
                
                {/* Right side - Navigation Icons with Tooltips */}
                <Box display="flex" alignItems="center" gap={1}>
                    {/* Home Icon - Navigate to home page */}
                    <IconButton
                        onClick={handleGoHome}
                        color="inherit"
                        aria-label="open home page"
                    >
                        <Tooltip title="Open home page">
                            <HomeIcon />
                        </Tooltip>
                    </IconButton>

                    {/* External Link Icon - Open web application in new tab */}
                    <IconButton
                        onClick={handleOpenInNewTab}
                        color="inherit"
                        aria-label="open in new tab"
                    >
                        <Tooltip title="Open web application">
                            <OpenInNewIcon />
                        </Tooltip>
                    </IconButton>

                    {/* Add Insurance Icon - Navigate to insurance scoring page */}
                    <IconButton
                        onClick={handleAddInsurance}
                        color="inherit"
                        aria-label="open in new tab"
                    >
                        <Tooltip title="Add a health insurance">
                            <AddBoxIcon />
                        </Tooltip>
                    </IconButton>

                    {/* Account Settings Icon - Navigate to profile page */}
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