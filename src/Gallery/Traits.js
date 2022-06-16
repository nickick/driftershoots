import { Box, Button, Typography } from '@mui/material';
import {
  array, bool, func, object, string,
} from 'prop-types';
import { useCallback, useState } from 'react';

function PillButton({ text, onClick, active = false }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      sx={[
        {
          bgcolor: active ? '#23222B' : 'black',
          borderRadius: '20px',
          border: active ? '1px solid rgba(108, 108, 150, 1.0)' : '1px solid rgba(54, 54, 75, 0.5)',
          mr: 2,
          mb: 2,
        },
        {
          '&:hover': {
            bgcolor: '#23222B',
            border: active ? '1px solid rgba(108, 108, 150, 1.0)' : '1px solid rgba(54, 54, 75, 0.5)',
          },
        },
      ]}
    >
      <Typography
        variant="body"
        sx={{
          textTransform: 'none',
          color: 'white',
          fontSize: '1.75rem',
          lineHeight: '3rem',
        }}
      >
        {text}
      </Typography>
    </Button>
  );
}

PillButton.propTypes = {
  text: string.isRequired,
  onClick: func.isRequired,
  active: bool,
};

PillButton.defaultProps = {
  active: false,
};

function TraitButton({ name, activeTraits, setGalleryTraits }) {
  const active = activeTraits.includes(name);

  const addOrRemoveActiveTrait = useCallback(() => {
    const activeTraitSet = new Set(activeTraits);

    if (active) {
      activeTraitSet.delete(name);
    } else {
      activeTraitSet.add(name);
    }

    setGalleryTraits(Array.from(activeTraitSet));
  }, [active, activeTraits, name, setGalleryTraits]);

  return (
    <PillButton
      onClick={addOrRemoveActiveTrait}
      active={active}
      text={name}
    />
  );
}

TraitButton.propTypes = {
  name: string.isRequired,
  activeTraits: array.isRequired,
  setGalleryTraits: func,
};

TraitButton.defaultProps = {
  setGalleryTraits: () => {},
};

export default function Traits({ traits, setGalleryFilters }) {
  const [activeTraits, setActiveTraits] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const setGalleryTraits = useCallback((newTraits) => {
    setGalleryFilters(newTraits);
    setActiveTraits(newTraits);
  }, [setGalleryFilters, setActiveTraits]);

  const toggleExpanded = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  let shownTraits = Array.from(traits);
  if (!expanded) {
    shownTraits = shownTraits.slice(0, 3);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {shownTraits.map((trait) => (
        <TraitButton
          key={trait}
          name={trait}
          activeTraits={activeTraits}
          setGalleryTraits={setGalleryTraits}
        />
      ))}
      {!expanded && (
        <PillButton
          text="+ + +"
          onClick={toggleExpanded}
        />
      )}
      {expanded && (
        <PillButton
          text="- - -"
          onClick={toggleExpanded}
        />
      )}
    </Box>
  );
}

Traits.propTypes = {
  traits: object,
  setGalleryFilters: func,
};

Traits.defaultProps = {
  traits: new Set(),
  setGalleryFilters: () => {},
};
