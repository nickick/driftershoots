import { Box } from '@mui/material';
import { OrderButton } from './OrderButton';

const PhotoBook = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Book</h1>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          position: 'relative',
        }}
      >
        <OrderButton />
      </Box>
    </div>
  );
};

export { PhotoBook };
