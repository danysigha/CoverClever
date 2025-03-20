import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography
} from "@mui/material";

import "../styles/Profile.css";
import { User } from "@coverclever/shared/";
import {NestedList} from '../components/NestedList';

/**
 * Props interface for the Profile component
 * @interface ProfileProps
 * @property {User | null} user - The user object containing profile information
 * @property {Function} [onLogout] - Optional callback function to handle user logout
 */
interface ProfileProps {
  user: User | null;
  onLogout?: () => void; // Callback for logout
}

/**
 * Profile component displays user information and provides logout functionality
 * 
 * @component
 * @param {ProfileProps} props - Component properties
 * @returns {JSX.Element} - Rendered Profile component
 */
const Profile: React.FC<ProfileProps> = (props) => {
  /** State to track loading status during logout */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handles the logout process and calls the provided onLogout callback
   * 
   * @function handleLogout
   * @returns {void}
   */
  const handleLogout = () => {
    setLoading(true);
    if (props.onLogout) {
      props.onLogout();
    }
    setLoading(false);
  };

  /**
   * Handles the profile edit functionality (currently just shows an alert)
   * 
   * @function handleEdit
   * @returns {void}
   */
  const handleEdit = () => {
    alert("editing...");
  };

  return (
    <div className="profile-container">
      <Typography className="page-title" sx={{fontSize: "2em", fontWeight: "900", marginBottom: "0.5rem"}}>Profile Settings</Typography>     
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        {/* Full Name field - readonly */}
        <Box>
          <TextField
            slotProps={{
              input: {
                readOnly: true,
                style: { 
                  color: "white", 
                },
                'aria-label': 'FULL NAME',
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#7b00ff !important" },
              } // Default border
            }}
            label="FULL NAME"
            variant="outlined"
            fullWidth
            value={props.user?.firstName + " " + props.user?.lastName}
            className="input-field"
          />
        </Box>
        
        {/* Email field - readonly */}
        <Box>
          <TextField
            slotProps={{
              input: {
                readOnly: true,
                style: { color: "white" },
                'aria-label': 'EMAIL',
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#7b00ff !important" },
              } // Default border
            }}
            label="EMAIL"
            variant="outlined"
            fullWidth
            value={props.user?.email}
            className="input-field"
          />
        </Box>

        {/* Income Level field - readonly */}
        <Box>
          <TextField
            slotProps={{
              input: {
                readOnly: true,
                style: { color: "white" },
                'aria-label': 'INCOME LEVEL',
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#7b00ff !important" },
              } // Default border
            }}
            label="INCOME LEVEL"
            variant="outlined"
            fullWidth
            value={props.user?.incomeLevel}
            className="input-field"
          />
        </Box>

        {/* Insurance Preference field - readonly multiline */}
        <Box>
          <TextField
            slotProps={{
              input: {
                readOnly: true,
                style: { color: "white" },
                'aria-label': 'INSURANCE PREFERENCE',
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#7b00ff !important" },
              } // Default border
            }}
            label="INSURANCE PREFERENCE"
            variant="outlined"
            multiline
            rows={4} // Adjust the height
            value={props.user?.insurancePreferenceExplanation}
            fullWidth
          />
        </Box>

        {/* User's additional information displayed as nested list */}
        <NestedList user={props.user} />
      </Box> 
      
      {/* Action buttons container */}
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"} marginTop={3} marginBottom={1}>
        {/* Logout button */}
        <Box>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="profileButtons"
          >
            {loading ? "Logging Out..." : "Log Out"}
          </button>
        </Box>

        {/* Edit button */}
        <Box>
          <button
            onClick={handleEdit}
            disabled={loading}
            className="profileButtons"
          >
            Edit
          </button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
