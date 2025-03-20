const express = require("express");
const router = express.Router();
const cors = require("cors");
const { authenticateUser } = require("../controllers/userController");

const { 
  getInsurancePolicies,      // GET /insurance-policies
  addInsurancePolicy,        // POST /insurance-policies
  getInsurancePolicyById,    // GET /insurance-policy/:policyId
  deleteInsurancePolicy,      // DELETE /insurance-policy/:policyId
} = require("../controllers/policyController");
const {getInsuranceScore} = require("../controllers/analyzePolicy");

router.use(
  cors({
    credentials: true,
    origin: ["chrome-extension://*", "http://localhost:5173", "https://cover-clever.vercel.app"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']  // Important for token access
})
);


router.get("/insurance-policies", authenticateUser, getInsurancePolicies);
router.post("/insurance-policies", authenticateUser, addInsurancePolicy);
router.get("/insurance-policy/:policyId", authenticateUser, getInsurancePolicyById);
router.delete("/insurance-policy/:policyId", authenticateUser, deleteInsurancePolicy);
router.post("/analyze-policy", authenticateUser, getInsuranceScore);
module.exports = router;