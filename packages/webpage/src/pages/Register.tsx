// import React from "react"
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
  Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AUTH_CONSTANTS } from "@coverclever/shared/";
import coverCleverLogo from "../assets/covercleverlogo.png";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [firstNameHelperText, setFirstNameHelperText] = useState("");
  const [lastNameHelperText, setLastNameHelperText] = useState("");
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  /**
   * Toggles password visibility in the input field
   * Switches between plain text and masked password display
   */
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  
  /**
   * Prevents default mouse-down behavior on password visibility toggle
   * This stops the button from taking focus when clicked
   * 
   * @param {React.MouseEvent<HTMLButtonElement>} event - The mouse event
   */
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /**
   * Validates the email input against required and format criteria
   * Sets appropriate error states and helper text messages
   * 
   * @param {string} email - Email string to validate
   * @returns {boolean} - Whether the email is valid
   */
  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError(true);
      setEmailHelperText(AUTH_CONSTANTS.ERROR_MESSAGES.EMAIL_REQUIRED);
      return false;
    }
    const isValid = AUTH_CONSTANTS.EMAIL_REGEX.test(email);
    if (!isValid) {
      setEmailError(true);
      setEmailHelperText(AUTH_CONSTANTS.ERROR_MESSAGES.EMAIL_INVALID);
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
    return isValid;
  };

  /**
   * Validates the password input against required and length criteria
   * Sets appropriate error states and helper text messages
   * 
   * @param {string} password - Password string to validate
   * @returns {boolean} - Whether the password is valid
   */
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError(true);
      setPasswordHelperText(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED);
      return false;
    }
    if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
      setPasswordError(true);
      setPasswordHelperText(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_LENGTH);
      return false;
    }
    setPasswordError(false);
    setPasswordHelperText("");
    return true;
  };


  function isAlpha(input: string) {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(input);
  }

  /**
   * Validates the first name input against empty strings
   * Sets appropriate error states and helper text messages
   * 
   * @param {string} firstName - first name string to validate
   * @returns {boolean} - Whether the first name is valid
   */
  const validateFirstName = (firstName: string): boolean => {
    if (!isAlpha(firstName)) {
      setFirstNameError(true);
      setFirstNameHelperText(AUTH_CONSTANTS.ERROR_MESSAGES.FIRST_NAME_INVALID);
      return false;
    }
    if (firstName.length < AUTH_CONSTANTS.MIN_NAME_LENGTH) {
      setFirstNameError(true);
      setFirstNameHelperText(AUTH_CONSTANTS.ERROR_MESSAGES.FIRST_NAME_LENGTH);
      return false;
    }
    setFirstNameError(false);
    setFirstNameHelperText("");
    return true;
  };


  /**
   * Validates the last name input against empty strings
   * Sets appropriate error states and helper text messages
   * 
   * @param {string} lastName - last name string to validate
   * @returns {boolean} - Whether the last name is valid
   */
  const validateLastName = (lastName: string): boolean => {
    if (!isAlpha(lastName)) {
      setLastNameError(true);
      setLastNameHelperText(AUTH_CONSTANTS.ERROR_MESSAGES.LAST_NAME_INVALID);
      return false;
    }
    if (lastName.length < AUTH_CONSTANTS.MIN_NAME_LENGTH) {
      setLastNameError(true);
      setLastNameHelperText(AUTH_CONSTANTS.ERROR_MESSAGES.LAST_NAME_LENGTH);
      return false;
    }
    setLastNameError(false);
    setLastNameHelperText("");
    return true;
  };

  // const [data, setData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });

  const registerUser = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set loading state to show progress indicator
    setIsLoading(true);
    
    // Reset error states before validation
    setEmailError(false);
    setPasswordError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setEmailHelperText("");
    setFirstNameHelperText("");
    setLastNameHelperText("");
    setPasswordHelperText("");

    // Validate both input fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);

    // Stop if validation fails
    if (!isEmailValid || !isPasswordValid || !isFirstNameValid || !isLastNameValid) {
      setIsLoading(false);
      return;
    }

    try {
      await axios.post("/register", {
        firstName,
        lastName,
        email,
        password,
      });
    
      toast.success("Registration success!");
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      const errorMessage = error.response?.data?.error || "Registration failed";
      
      toast.error(errorMessage);
      console.error(error);
    }
  };

  return (
    <Box>
      {/* Application logo */}
      <Box className="logo"
            component="img"
            sx={{
                width: "10em",
                height: "auto",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "4rem",
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

      <form onSubmit={(e) => {
        e.preventDefault();
        registerUser(e);
      }}>
        <Typography variant="h4" textAlign={"center"}>
          Cover Clever
        </Typography>

        <TextField
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          variant="outlined"
          required
          fullWidth
          value={firstName}
          className="input-field"
          error={firstNameError}
          helperText={firstNameHelperText}
        />
        <TextField
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          variant="outlined"
          required
          fullWidth
          value={lastName}
          className="input-field"
          error={lastNameError}
          helperText={lastNameHelperText}
        />
        <TextField
          label="Email"
          variant="outlined"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
          error={emailError}
          helperText={emailHelperText}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    sx={{ color: "black" }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
          label="Password"
          required
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          error={passwordError}
          helperText={passwordHelperText}
        />

        {/* Action buttons container */}
        <Button
          type="submit"
          disabled={isLoading}
          sx={{ width: "100%", marginBottom: "10px" }}
          variant="contained"
          color="primary"
          aria-label="Register button"
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Register"}
        </Button>
      </form>
    </Box>
  );
}

export default Register;