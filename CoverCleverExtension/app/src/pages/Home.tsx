import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { api } from '../services/api';

interface InsurancePolicy {
  policyId: string;
  score: number;
  comments: string;
}

// Simplified dummy data
const dummyPolicies: InsurancePolicy[] = [
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

const Home: React.FC = () => {
  const [policies, setPolicies] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handlePolicyClick = (policyId: string) => {
    // Handle click event - you can navigate to a detail page or show a modal
    console.log(`Clicked policy: ${policyId}`);
  };

  const renderPolicyRows = () => {
    // return policies.insurancePolicies.map((policy) => (
      return policies.map((policy) => (
      <div 
        className="policy-row" 
        // key={policy._id}
        // onClick={() => handlePolicyClick(policy._id)}
        key={policy.policyId}
        onClick={() => handlePolicyClick(policy.policyId)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            // handlePolicyClick(policy._id);
            handlePolicyClick(policy.policyId);
          }
        }}
      >
        <div className="policy-header">
          {/* <h3>Policy ID: {policy._id}</h3> */}
          <h3>Policy ID: {policy.policyId}</h3> 
          <div className={`policy-score score-${policy.score >= 90 ? 'high' : policy.score >= 70 ? 'medium' : 'low'}`}>
            Score: {policy.score}
          </div>
        </div>
        
        <div className="policy-details">
          <div className="comments">
            <h4>Analysis</h4>
            <p>{policy.comments}</p>
          </div>
        </div>
      </div>
    ));
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
      <div className="policies-container">
        {renderPolicyRows()}
      </div>
    );
  };

  return (
    <div className="home-container">
      <h1 className="page-title">Scored Insurance Plans</h1>
      {renderContent()}
    </div>
  );
};

export default Home;