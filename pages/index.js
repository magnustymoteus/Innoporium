import Head from 'next/head'
import React from 'react'

import Header from '../components/Header';
import Home from '../components/main/Home';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Innoporium 2049 - Center of Innovation</title>
        <meta name="description" content="Center of innovation." />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
    <Header/>
    <main>
    <Home/>
    </main>
    <Footer/>
    </React.Fragment>
  )
}
export default Index;