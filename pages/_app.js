import { ThemeContext } from '../src';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <ThemeContext>
      <Component {...pageProps} />
    </ThemeContext>
  )
}

export default App
