import Head from 'next/head'
import React from 'react'

import Header from '../components/Header';
import Shop from '../components/main/Shop';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Innoporium 2049 - Keycards</title>
        <meta name="description" content="Center of innovation." />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
    <Header/>
    <main>
    <Shop/>
    </main>
    <Footer/>
    </React.Fragment>
  )
}
export default Index;