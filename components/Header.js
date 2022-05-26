/* By Patryk Pilichowski, All rights reserved.*/
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

import React, {useEffect, useState} from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

import Logo from '../public/images/svg/logo-white.svg';
import Aos from 'aos';

const defaultPImg = "https://res.cloudinary.com/dmejmwxek/image/upload/v1651499272/profile_pictures/04.png";

const Header = () => {
    const {data: session, status} = useSession();
    const [ubits, setUbits] = useState();
    const getUbits = async() => {
      try {
        const res = await fetch("/api/get-client");
        const result = await res.json();
        if(result.code === "success") {
          setUbits(parseFloat(result.user.ubits));
        }
      }
      catch(error) {
        console.log(error);
      }
    }
    useEffect(() => {
        Aos.init({duration: 1e3});
        if(session && status == "authenticated") {
        getUbits();
        }
    });
    const sOut = (e) => {
      e.preventDefault();
      signOut();
    }
    return (
       <header>
    <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top">
    <Container>
    <Link href="/" passHref><a><Logo className="logoWhite mx-2 animate__animated animate__fadeIn my-2"/></a></Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className="animate__animated animate__fadeIn">
      <Nav className="me-auto">
        <Link href="/" passHref><Nav.Link className="mx-2 text-white">expo</Nav.Link></Link>
        <Link href="https://www.youtube.com/watch?v=yC9ZDxjahIA" passHref><Nav.Link className="mx-2 text-white" target="_blank" rel="noopener noreferrer">behind the scenes</Nav.Link></Link>
        <Link href="/contact" passHref><Nav.Link className="mx-2 text-white">contact</Nav.Link></Link>
      </Nav>
      <Nav>
      {
      !session && status == "unauthenticated" && (<Link href="/sign-in" passHref><Nav.Link className="mx-2 text-white">sign in</Nav.Link></Link>)
      }
      {
      session && status == 'authenticated' && (
        <React.Fragment>
        <NavDropdown title={<Image src={(session.user.image)?session.user.image:defaultPImg} alt={session.user.image} className="profileImg" width="44px" height="44px"/>}
         id="basic-nav-dropdown" menuVariant="dark">
          <p className="text-center my-auto mx-3">{(session.user.firstName && session.user.secondName)? `${session.user.firstName} ${session.user.secondName}`: session.user.name}</p>
          <NavDropdown.Divider/>
          {session && session.user.admin>=1 && status == "authenticated" && (<Link href="/admin" passHref><Nav.Link className="mx-2 text-center my-auto">admin</Nav.Link></Link>)}
          {!session.user.native && !session.user.profileComplete && (<Link href="/complete-profile" passHref><Nav.Link className="mx-2 text-center my-auto">Complete Profile</Nav.Link></Link>)}
          {(session.user.profileComplete || session.user.native) && (<Link href="/cart" passHref><Nav.Link className="mx-2 text-center my-auto">Cart</Nav.Link></Link>)}
         <Link href="/api/auth/signout" passHref><Nav.Link className="mx-2 text-white text-center my-auto"  onClick={e => sOut(e)}>sign out</Nav.Link></Link>
      </NavDropdown>
        {(session.user.ubits)?<p className="mx-2 my-auto text-white ubit">U {ubits}</p>:<></>}
        </React.Fragment>
      )
      }
      </Nav>
      <Nav>
      <Link href="/shop" passHref><Nav.Link className="text-white mx-2"><button className="button btnRed my-1">shop</button></Nav.Link></Link>
      </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
       </header>
    );
}
export default Header;