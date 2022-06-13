import { ExpandMore } from '@mui/icons-material';
import {
  AccordionSummary, Accordion, AccordionDetails, Box, Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export function RawJson({ title, json, isLandscape }) {
  // return (
  //   <pre>
  //     {JSON.stringify(metadata, undefined, 2)}
  //   </pre>
  // )

  return (
    <Accordion defaultExpanded={isLandscape}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="body"
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxHeight: '300px',
          maxWidth: '40vw',
          overflowY: 'scroll',
          overflowX: 'hidden',
          fontSize: '1rem',
        }}
      >
        <Box>
          <pre>
            {JSON.stringify(json, undefined, 2)}
          </pre>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

RawJson.propTypes = {
  title: PropTypes.string.isRequired,
  json: PropTypes.any.isRequired,
  isLandscape: PropTypes.bool.isRequired,
};
