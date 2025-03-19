import * as React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { User } from '../types/User';
import {Box, List, ListItemButton, ListItemText, Collapse} from "@mui/material";

/**
 * Props for the NestedList component
 * @interface NestedMenuProps
 * @property {User | null | undefined} user - The user object containing medical conditions and desired benefits
 */
interface NestedMenuProps {
  user?: User | null; // User object or null
}

/**
 * A collapsible nested list component that displays a user's medical conditions
 * and desired benefits in expandable/collapsible sections
 * 
 * @param {NestedMenuProps} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export const NestedList: React.FC<NestedMenuProps> = (props) => {
    // State to track whether the Benefits section is expanded
  const [openBenefits, setOpenBenefits] = React.useState(true);

  // State to track whether the Conditions section is expanded
  const [openConditions, setOpenConditions] = React.useState(true);

  /**
   * Toggle the expansion state of the Benefits section
   */
  const handleBenefitsClick = () => {
    setOpenBenefits(!openBenefits);
  };

  /**
   * Toggle the expansion state of the Conditions section
   */
  const handleConditionsClick = () => {
    setOpenConditions(!openConditions);
  };

  return (
    <>
        <List
        sx={{ width: '100%' }}
        component="nav"
        aria-labelledby="medical-conditions-and-desired-benefits"
        >
            {/* Container for both collapsible sections with vertical spacing */}
            <Box display={"flex"} flexDirection={"column"} gap={2}>
                <Box sx={{bgcolor: '#ffffffab'}}>
                    <ListItemButton onClick={handleConditionsClick}>
                        <ListItemText primary="Medical Conditions" />
                        {/* Show different icon based on expanded/collapsed state */}
                        {openConditions ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {/* Collapsible content area with animation */}
                    <Collapse in={openConditions} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {/* Map through user's medical conditions if they exist */}
                            {Object.keys(props.user?.medicalConditions || {}).map((key) => (
                                <ListItemButton key={key} sx={{ pl: 4 }}>
                                    <ListItemText primary={key} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </Box>
                {/* Desired Benefits section with semi-transparent white background */}
                <Box sx={{bgcolor: '#ffffffab'}}>
                    {/* Clickable header with expand/collapse icon */}
                    <ListItemButton onClick={handleBenefitsClick}>
                        <ListItemText primary="Desired Benefits" />
                        {/* Show different icon based on expanded/collapsed state */}
                        {openBenefits ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {/* Collapsible content area with animation */}
                    <Collapse in={openBenefits} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        {/* Map through user's desired benefits if they exist */}
                        {Object.keys(props.user?.desiredBenefits || {}).map((key) => (
                            <ListItemButton key={key} sx={{ pl: 4 }}>
                                <ListItemText primary={key} />
                            </ListItemButton>
                        ))}
                        </List>
                    </Collapse>
                </Box>
            </Box>
        </List>
    </>
  );
};
