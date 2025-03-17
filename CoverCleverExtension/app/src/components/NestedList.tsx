import * as React from 'react';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { User } from '../types/User';
import {Box, List, ListItemButton, ListItemText, Collapse} from "@mui/material";

interface NestedMenuProps {
  user?: User | null; // User object or null
}

export const NestedList: React.FC<NestedMenuProps> = (props) => {
  const [openBenefits, setOpenBenefits] = React.useState(true);

  const [openConditions, setOpenConditions] = React.useState(true);

  const handleBenefitsClick = () => {
    setOpenBenefits(!openBenefits);
  };

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
            <Box display={"flex"} flexDirection={"column"} gap={2}>
                <Box sx={{bgcolor: '#ffffffab'}}>
                    <ListItemButton onClick={handleConditionsClick}>
                        <ListItemText primary="Medical Conditions" />
                        {openConditions ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openConditions} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {Object.keys(props.user?.medicalConditions || {}).map((key) => (
                                <ListItemButton key={key} sx={{ pl: 4 }}>
                                    <ListItemText primary={key} />
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                </Box>
                <Box sx={{bgcolor: '#ffffffab'}}>
                    <ListItemButton onClick={handleBenefitsClick}>
                        <ListItemText primary="Desired Benefits" />
                        {openBenefits ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openBenefits} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
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
