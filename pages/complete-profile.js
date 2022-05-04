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
     if(!session || session.user.native || session.user.profileComplete || status == 'unauthenticated') {
       router.push('/');
     }
  });
  return (
    <React.Fragment>
      <Head>
        <title>Innoporium 2049 - Complete Profile</title>
        <meta name="description" content="Center of innovation." />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
    <Header/>
    <main>
    <SignUp title="Complete Profile" hideAHABtn nonNative/>
    </main>
    </React.Fragment>
  )
}
export default SignUp_Index;