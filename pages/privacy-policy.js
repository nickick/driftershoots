import { Box } from '@mui/material';
import PrivacyPolicy from '../src/PrivacyPolicy';

export default function PrivacyPolicyPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: {
          xs: 'inherit',
          md: '90vh',
        },
      }}
    >
      <PrivacyPolicy />
    </Box>
  );
}
