import { Box, Container, Typography } from "@mui/material";
import tiles from './tiles.json';

function SelectorTile ({category, title, isSelected, index, setSelected}) {
  return (
    <Box
      sx={{
        flex: 1,
        cursor: 'pointer',
      }}
      onClick={() => {
        setSelected(index);
      }}
    >
      <Typography
        variant="overline"
        sx={{
          fontSize: '1.375rem',
          lineHeight: '2rem',
          letterSpacing: '0.1rem',
          mb: 1,
          color: isSelected ? 'text.primary' : 'text.secondary',
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
          color: isSelected ? 'text.primary' : 'text.secondary',
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
  )
}

export default function Selector ({selectedTileIndex, setSelectedTileIndex}) {
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
        tiles.map((tile, index) => {
          return (
            <SelectorTile 
              category={tile.category} 
              index={index}
              isSelected={index == selectedTileIndex}
              key={index} 
              setSelected={setSelectedTileIndex}
              title={tile.title} 
            />
          )
        })
      }
    </Container>
  )
} 