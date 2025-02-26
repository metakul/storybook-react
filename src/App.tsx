import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { CssBaseline, ThemeProvider } from "@mui/material";
//theme
import { ColorModeContext, getColors, useMode } from "./layout/Theme/themes";
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
    </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
