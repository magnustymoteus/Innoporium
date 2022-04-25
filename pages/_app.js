import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import 'react-phone-input-2/lib/style.css'

import "../styles/_global.scss";
import "../styles/header.scss";

import "../styles/main.scss";
import "../styles/shop.scss";

import "../styles/footer.scss";

import { SessionProvider } from 'next-auth/react';

import { setCookies } from 'cookies-next';

setCookies('sameSite', 'strict');

const MyApp = ({ Component, pageProps: {session, ...pageProps} }) => {
  return (
    <SessionProvider session={session}>
       <Component {...pageProps} />
    </SessionProvider>
  );  
}

export default MyApp;
