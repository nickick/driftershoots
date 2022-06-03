import { Box } from '@mui/material';
import Publications from '../src/Publications';

export default function PublicationPage() {
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
      <Publications />
    </Box>
  );
}
