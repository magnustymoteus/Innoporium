import Head from 'next/head'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import {useSession} from 'next-auth/react';

import Header from '../components/Header';
import SignUp from '../components/main/SignUp';

const SignUp_Index = () => {
  const router = useRouter();
  const {data: session, status} = useSession();
  useEffect(() => {
     if(session && status == 'authenticated') {
       router.push('/');
     }
  });
  return (
    <React.Fragment>
      <Head>
        <title>Innoporium 2049 - Sign Up</title>
        <meta name="description" content="Center of innovation." />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
    <Header/>
    <main>
    <SignUp/>
    </main>
    </React.Fragment>
  )
}
export default SignUp_Index;