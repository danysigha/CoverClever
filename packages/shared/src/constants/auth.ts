export const AUTH_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 2,
  EMAIL_REGEX: /\S+@\S+\.\S+/,
  ERROR_MESSAGES: {
    EMAIL_REQUIRED: "Email is required",
    EMAIL_INVALID: "Invalid email format",
    EMAIL_TAKEN: "Email is already registered",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_LENGTH: "Password must be at least 6 characters",
    LOGIN_FAILED: "Login failed. Please check your credentials.",
    FIRST_NAME_INVALID: "Please enter a valid first name",
    LAST_NAME_INVALID: "Please enter a valid last name",
    FIRST_NAME_LENGTH: "First name must be at least 2 characters",
    LAST_NAME_LENGTH: "Last name must be at least 2 characters"
  }
} as const; 