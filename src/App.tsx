import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, GlobalStyle, lightTheme } from './theme';
import { Play } from './pages';



function App() {
  const [theme, setTheme] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? darkTheme : lightTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    setTheme(event.matches ? darkTheme : lightTheme);
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <Play theme={theme} setTheme={setTheme}/>
    </ThemeProvider>
  );
}

export default App;
