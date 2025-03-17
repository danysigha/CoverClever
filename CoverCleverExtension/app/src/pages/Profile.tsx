import React, { useState } from "react";
import {
  Box,
  TextField
} from "@mui/material";

import "../styles/Profile.css";
import { User } from '../types/User';
import {NestedList} from '../components/NestedList';

interface ProfileProps {
  user: User | null;
  onLogout?: () => void; // Callback for logout
}

const Profile: React.FC<ProfileProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = () => {
    setLoading(true);
    if (props.onLogout) {
      props.onLogout();
    }
    setLoading(false);
  };

  const handleEdit = () => {
    alert("editing...");
  };

  return (
    <div className="profile-container">
      <h1 className="page-title">Profile Settings</h1>     
      <Box display={"flex"} flexDirection={"column"} gap={2}>
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

        <NestedList user={props.user} />
      </Box> 
      
      <Box display={"flex"} flexDirection={"row"} justifyContent={"space-around"} marginTop={3} marginBottom={1}>
        <Box>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="profileButtons"
          >
            {loading ? "Logging Out..." : "Log Out"}
          </button>
        </Box>

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
