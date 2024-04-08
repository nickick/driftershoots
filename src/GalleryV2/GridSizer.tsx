import { Box } from '@mui/material';
import { TogglePill } from './Filter';

export enum GRID_SIZES {
  LARGE = 50,
  MEDIUM = 100,
  SMALL = 200,
}

type GridSizerProps = {
  setGridSize: (size: keyof typeof GRID_SIZES) => void;
  gridSize: string;
};

const GridSizer = ({ gridSize, setGridSize }: GridSizerProps) => {
  return (
    <Box sx={{
      display: 'flex',
      position: {
        xs: 'fixed',
        md: 'relative'
      },
      zIndex: 21,
      transform: {
        xs: 'translateY(50%)',
        md: 'none',
      },
      bottom: {
        xs: '50%',
        md: 'auto',
      },
      right: {
        xs: 14,
        md: 'auto',
      },
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: {
        xs: 'column',
        md: 'row',
      },
      gap: {
        xs: 0,
        md: 2,
      },
      mb: {
        xs: 0,
        md: 2,
      },
      backgroundColor: {
        xs: 'rgba(255, 255, 255, 0.1)',
        md: 'rgba(255, 255, 255, 0)',
      },
      backdropFilter: 'blur(10px)',
      py: {
        xs: 1.5,
        md: 0,
      },
      px: {
        xs: 0.5,
        md: 0,
      },
      borderRadius: {
        xs: 20,
        md: 5,
      }
    }}>
      {(Object.keys(GRID_SIZES) as Array<keyof typeof GRID_SIZES>).filter(v => isNaN(Number(v))).map((size) =>
        <TogglePill
          key={size}
          active={gridSize === size}
          onClick={() => {
            setGridSize(size);
          }}
        >
          {GRID_SIZES[size].toString()}
        </TogglePill>
      )}
    </Box>
  );
};

export default GridSizer;
