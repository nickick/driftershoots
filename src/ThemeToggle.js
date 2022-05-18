import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeToggle () {
  const { selectedTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <Box>
      This app is using the {selectedTheme} mode
      <Button 
        onClick={toggleTheme}
      >
        Toggle Theme
      </Button>
    </Box>
  )
}