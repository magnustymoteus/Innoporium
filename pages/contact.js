import React from 'react';
import Head from 'next/head'

import Header from '../components/Header';
import Contact from '../components/main/Contact';

const SignIn_Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Innoporium 2049 - Contact Us</title>
        <meta name="description" content="Center of innovation." />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
    <Header/>
    <main>
    <Contact />
    </main>
    </React.Fragment>
  )
}
export default SignIn_Index;