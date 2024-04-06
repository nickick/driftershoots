import { Box, Typography } from '@mui/material';

type FilterPillProps = {
  active: boolean;
  onClick: () => void;
  children: string;
};

const FilterPill = ({ active, onClick, children }: FilterPillProps) => (
  <Typography
    variant="body2"
    sx={{
      fontSize: 16,
      color: active ? '#fff' : '#ccc',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      borderRadius: '50px',
      border: '1px solid #333',
      backdropFilter: 'blur(10px)',
      px: 2,
      py: 1,
      opacity: active ? 1 : 0.5,
      '&:hover': {
        opacity: 1,
      }
    }}
    onClick={onClick}
  >
    {children}
  </Typography>
);

enum FILTER_TYPES {
  OTHER = 'Other',
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
      <FilterPill
        active={activeFilters.includes(FILTER_TYPES.OTHER)}
        onClick={() => toggleFilter(FILTER_TYPES.OTHER)}
      >
        Uncollected works
      </FilterPill>
      <FilterPill
        active={activeFilters.includes(FILTER_TYPES.WHERE_MY_VANS_GO)}
        onClick={() => toggleFilter(FILTER_TYPES.WHERE_MY_VANS_GO)}
      >
        Where My Vans Go
      </FilterPill>
    </Box>
  );
};

export default Filter;
