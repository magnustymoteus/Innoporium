import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import {getSession} from 'next-auth/react';

import Header from '../components/Header';
import Cart from '../components/main/Cart';
import Footer from '../components/Footer';

import Script from 'next/script'

const Index = () => {
  const router = useRouter();
  const checkComplete = async() => {
    const session = await getSession();
    if(!session || (!session.user.native && !session.user.profileComplete)) {
      router.push('/');
    }
  }
  useEffect(() => {
     checkComplete();
  });
  return (
    <React.Fragment>
      <Head>
        <title>Innoporium 2049 - Shopping Cart</title>
        <meta name="description" content="Center of innovation." />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
    <Header/>
    <Script src="https://kit.fontawesome.com/a65bd54a8d.js" crossorigin="anonymous"></Script>
    <main>
    <Cart/>
    </main>
    <Footer/>
    </React.Fragment>
  )
}
export default Index;