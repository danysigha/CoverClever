/**
 * Home component that displays scored insurance plans.
 * Fetches policy data and displays it using ScoreCards component.
 * @module Home
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { api } from '../services/api';
import {
  Box,
  Typography
} from "@mui/material";
import { PolicyScore } from "@coverclever/shared/";
import { ScoreCards } from '../components/ScoreCards';

/**
 * Simplified dummy data for development and testing.
 * Mock policies represent different insurance plan options with varying scores and descriptions.
 * @type {PolicyScore[]}
 */
const dummyPolicies: PolicyScore[] = [
  {
    policyId: "BCBS-2024-001",
    score: 85,
    comments: "Good fit for young professionals. Low deductible but higher monthly premium."
  },
  {
    policyId: "BCBS-2024-002",
    score: 72,
    comments: "Budget-friendly option with higher deductibles. Good for healthy individuals."
  },
  {
    policyId: "BCBS-2024-003",
    score: 95,
    comments: "Premium plan with comprehensive coverage. Ideal for families or those needing frequent care."
  }
];

/**
 * Home page component that displays insurance policy scores.
 * Handles authentication, data fetching, loading states and rendering policy cards.
 * @returns {React.ReactElement} The rendered Home component
 */
const Home: React.FC = () => {
  const [policies, setPolicies] = useState<PolicyScore[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  /**
   * Fetches policy data on component mount.
   * Redirects to login if user is not authenticated.
   * Currently uses dummy data instead of actual API call for development.
   */
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        
        setIsLoading(true);
        // const data = await api.getPolicies(token);
        const data = dummyPolicies;
        setPolicies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch policies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, [navigate]);

  
  /**
   * Renders appropriate content based on loading state, errors, and data availability.
   * @returns {React.ReactElement} The content to be rendered
   */
  const renderContent = () => {
    if (isLoading) {
      return <Box>Loading...</Box>;
    }
    if (error) {
      return <Box>Error: {error}</Box>;
    }
    if(policies) {
      return (
        <Box className="policies-container">
          <ScoreCards policies={policies} />
        </Box>
      );
    } else {
      return <Box><Typography>No policies found.</Typography></Box>
    }
  };

  return (
    <Box className="home-container">
      <Typography variant="h1" className="page-title" sx={{fontSize: "2em", fontWeight: "900", marginBottom: "0.5rem"}}>Scored Insurance Plans</Typography>
      {renderContent()}
    </Box>
  );
};

export default Home;