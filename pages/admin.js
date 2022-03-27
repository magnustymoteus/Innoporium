import Head from 'next/head'
import React, {useEffect} from 'react'
import {useRouter} from 'next/router';
import {getSession} from 'next-auth/react';

import Header from '../components/Header';
import Users from '../components/main/Users';
const Admin_Index = () => {
  const router = useRouter();
  const adminCheck = async() => {
    const session = await getSession();
    if(!session || !session.user.admin) {
        router.push('/');
    }
  }
  useEffect(() => {
    adminCheck();
  });
  return (
    <React.Fragment>
      <Head>
        <title>Innoporium 2049 - Admin</title>
        <meta name="description" content="Center of innovation." />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>
    <Header/>
    <main>
    <Users/>
    </main>
    </React.Fragment>
  )
}
export default Admin_Index;