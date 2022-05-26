import {
  Box, Container, Typography, keyframes,
} from '@mui/material';
import { entranceAnimationDelay, entranceAnimationDuration } from './constants';
import tiles from './tiles.json';

const popDown = keyframes`
  0% {
    -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
`;

const popUp = keyframes`
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-5px);
            transform: translateY(-5px);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

function SelectorTile({
  category, title, isSelected, index, setSelected, setTransitioning,
}) {
  return (
    <Box
      sx={[
        {
          flex: 1,
          cursor: 'pointer',
          color: isSelected ? 'text.primary' : 'text.secondary',
          animation: `${popDown} 0.3s both 0.3s`,
        },
        {
          '&:hover': {
            color: 'text.primary',
            animation: `${popUp} 0.3s both 0.2s`,
          },
        },
        {
          '&:hover > div': {
            borderTopColor: 'text.primary',
          },
        },
      ]}
      onClick={() => {
        setSelected(index);
        setTransitioning(true);
      }}
    >
      <Box
        sx={{
          animation: `${fadeIn} ${entranceAnimationDuration}s both ${0.2 + entranceAnimationDelay + index * 0.15}s`,
        }}
      >
        <Typography
          variant="overline"
          sx={{
            fontSize: '1.375rem',
            lineHeight: '2rem',
            letterSpacing: '0.1rem',
            mb: 1,
            transition: 'color 0.2s ease',
          }}
        >
          {category}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: '2rem',
            lineHeight: '3rem',
            mb: 2,
            transition: 'color 0.2s ease',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            height: 0,
            borderTopColor: isSelected ? 'text.primary' : 'text.secondary',
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            transition: 'border-top-color 0.2s ease',
          }}
        />
      </Box>
    </Box>
  );
}

export default function Selector({ selectedTileIndex, setSelectedTileIndex, setTransitioning }) {
  return (
    <Container
      sx={{
        maxWidth: '1440px',
        px: 4,
        display: 'flex',
        gap: '4rem',
        mb: 6,
      }}
    >
      {
        tiles.map((tile, index) => (
          <SelectorTile
            category={tile.category}
            index={index}
            isSelected={index == selectedTileIndex}
            key={index}
            setSelected={setSelectedTileIndex}
            title={tile.title}
            setTransitioning={setTransitioning}
          />
        ))
      }
    </Container>
  );
}
