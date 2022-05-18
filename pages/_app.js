import { ThemeContext } from '../src';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {

  return (
    <ThemeContext>
      <Component {...pageProps} />
    </ThemeContext>
  )
}

export default MyApp
