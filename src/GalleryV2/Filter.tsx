import { Box, Typography } from '@mui/material';
import { fadeIn } from './animations';

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
        py: 2,
        display: 'flex',
        justifyContent: {
          xs: 'center',
          md: 'flex-start',
        },
        alignItems: 'center',
        gap: 2,
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
          md: '0'
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
      <Typography
        variant="body2"
        sx={{
          fontSize: 16,
          color: activeFilters.includes('Other') ? '#fff' : '#ccc',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          borderRadius: '50px',
          border: '1px solid #333',
          backdropFilter: 'blur(10px)',
          px: 2,
          py: 1,
        }}
        onClick={() => toggleFilter('Other')}
      >
        Uncollected works
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: 16,
          color: activeFilters.includes('Where My Vans Go') ? '#fff' : '#ccc',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          borderRadius: '50px',
          border: '1px solid #333',
          backdropFilter: 'blur(10px)',
          px: 2,
          py: 1,
        }}
        onClick={() => toggleFilter('Where My Vans Go')}
      >
        Where My Vans Go
      </Typography>
    </Box>
  );
};

export default Filter;
