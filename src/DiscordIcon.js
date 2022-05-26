import { Box } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function DiscordIcon({ color }) {
  const { selectedTheme } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src={selectedTheme == 'light' ? '/icons/discord.svg' : '/icons/discord-white.svg'}
        style={{
          width: '20px',
          marginLeft: '0',
        }}
      />
    </Box>
  );
}
