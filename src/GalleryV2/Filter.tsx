import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

type TogglePillProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
};

const activeBgColor = 'rgba(255, 255, 255, 1)';
const inactiveBgColor = 'rgba(255, 255, 255, 0.3)';

export const TogglePill = ({ active, onClick, children }: TogglePillProps) => (
  <Typography
    variant="body2"
    sx={{
      fontSize: 16,
      color: {
        xs: active ? `${activeBgColor}` : `${inactiveBgColor}`,
        md: active ? '#fff' : '#ccc',
      },
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      borderRadius: '50px',
      backgroundColor: {
        md: active ? '#333' : 'transparent',
      },
      px: {
        xs: 1,
        md: 2,
      },
      py: 1,
      opacity: active ? 1 : 0.5,
      '&:hover': {
        opacity: {
          xs: active ? 1 : 0.5,
          md: 1,
        },
      },
      '&:focus': {
        opacity: active ? 1 : 0.5,
      },
      '&:active': {
        opacity: active ? 1 : 0.5,
      },
    }}
    onClick={onClick}
  >
    {children}
  </Typography>
);

enum FILTER_TYPES {
  OTHER = 'Other',
  RETURN_TO_SOURCE = 'Return To Source',
  WHERE_MY_VANS_GO = 'Where My Vans Go',
}

type FilterProps = {
  activeFilters: string[];
  setFilters: (filters: string[]) => void;
};

const Filter = ({ activeFilters, setFilters }: FilterProps) => {
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setFilters(activeFilters.filter((f) => f !== filter));
    } else {
      setFilters([...activeFilters, filter]);
    }
  };

  return (
    <Box
      sx={{
        py: 0,
        mb: {
          xs: 0,
          md: 2,
        },
        display: 'flex',
        justifyContent: {
          xs: 'center',
          md: 'flex-start',
        },
        alignItems: 'center',
        color: '#ccc',
        position: {
          xs: 'fixed',
          md: 'relative',
        },
        top: {
          xs: 'auto',
          md: 0,
        },
        bottom: {
          xs: 20,
          md: 'auto',
        },
        zIndex: 2,
        left: {
          xs: '50%',
          md: '0',
        },
        width: {
          xs: '100%',
          md: 'auto',
        },
        transform: {
          xs: 'translateX(-50%)',
          md: 'none',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
          px: {
            xs: 2,
            md: 0,
          },
          backgroundColor: {
            xs: 'rgba(255, 255, 255, 0.1)',
            md: 'rgba(255, 255, 255, 0)',
          },
          backdropFilter: 'blur(10px)',
          borderRadius: 20,
        }}
      >
        <TogglePill
          active={activeFilters.includes(FILTER_TYPES.OTHER)}
          onClick={() => toggleFilter(FILTER_TYPES.OTHER)}
        >
          Uncollected works
        </TogglePill>
        <TogglePill
          active={activeFilters.includes(FILTER_TYPES.RETURN_TO_SOURCE)}
          onClick={() => toggleFilter(FILTER_TYPES.RETURN_TO_SOURCE)}
        >
          Return To Source
        </TogglePill>
        <TogglePill
          active={activeFilters.includes(FILTER_TYPES.WHERE_MY_VANS_GO)}
          onClick={() => toggleFilter(FILTER_TYPES.WHERE_MY_VANS_GO)}
        >
          Where My Vans Go
        </TogglePill>
      </Box>
    </Box>
  );
};

export default Filter;
