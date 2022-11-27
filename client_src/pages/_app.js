import "../components/WorkoutForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../components/Login.css"
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
