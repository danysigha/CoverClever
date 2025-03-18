import { PolicyScore } from '../types/PolicyScore';
import {
    Box,
    Typography
} from "@mui/material";
import "../styles/ScoreCards.css"

interface ScoreCardProps {
    policies: PolicyScore[];
}

export const ScoreCards: React.FC<ScoreCardProps> = (props) => {

    const handlePolicyClick = (policy: PolicyScore) => {
        // Handle click event - you can navigate to a detail page or show a modal
        console.log(`Clicked policy: ${policy.policyId}`);
    };

    return props.policies.map((policy) => (
        <Box 
            className="policy-row"
            key={policy.policyId}
            onClick={() => handlePolicyClick(policy)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handlePolicyClick(policy);
            }
            }}>
            <Box className="policy-header">
                <Typography variant='h3'>Policy ID: {policy.policyId}</Typography>
                <Typography variant='h4' className={`policy-score score-${policy.score >= 90 ? 'high' : policy.score >= 70 ? 'medium' : 'low'}`}>
                    Score: {policy.score}
                </Typography>
            </Box>
            <Box className="policy-details">
              <Box className="comments">
                <Typography variant='h4'>Analysis</Typography>
                <Typography variant='body1'>{policy.comments}</Typography>
              </Box>
            </Box>
        </Box>
    ));
}