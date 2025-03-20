import { PolicyScore } from "@coverclever/shared/";
import {
    Box,
    Typography
} from "@mui/material";
import "../styles/ScoreCards.css"


/**
 * Props interface for the ScoreCards component
 * @interface ScoreCardProps
 * @property {PolicyScore[]} policies - Array of policy objects with scoring information
 */
interface ScoreCardProps {
    policies: PolicyScore[];
}

/**
 * ScoreCards Component
 * Renders a list of policy cards with their IDs, scores and analysis comments
 * 
 * @component
 * @param {ScoreCardProps} props - The component props
 * @returns {JSX.Element[]} Array of policy card elements
 */
export const ScoreCards: React.FC<ScoreCardProps> = (props) => {

    /**
     * Handles click events on policy cards
     * @param {PolicyScore} policy - The policy that was clicked
     */
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
            /**
             * Handle keyboard navigation for accessibility
             * Activates the card when Enter or Space is pressed
             */
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