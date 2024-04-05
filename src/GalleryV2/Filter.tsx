import { Box, Typography } from '@mui/material';

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
        gap: 2,
        color: '#ccc',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontSize: 16,
          color: activeFilters.includes('Other') ? '#fff' : '#ccc',
          cursor: 'pointer',
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
        }}
        onClick={() => toggleFilter('Where My Vans Go')}
      >
        Where My Vans Go
      </Typography>
    </Box>
  );
};

export default Filter;
