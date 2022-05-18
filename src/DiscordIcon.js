import { Box } from '@mui/material';

export default function DiscordIcon({color}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <img 
        src={color == 'black' ? '/icons/discord.svg' : '/icons/discord-white.svg'}
        style={{
          width: '20px',
          marginLeft: '0'
        }}
      />
    </Box>
  )
}