/* By Patryk Pilichowski, All rights reserved.*/
import Aos from 'aos';
import React, { useEffect} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import Image1 from '../../public/images/svg/octatech.svg';
import Image2 from '../../public/images/svg/infrapoint.svg';
import Image3 from '../../public/images/svg/tymocorp.svg';

import LeftElement from '../../public/images/svg/left_element.svg';
import RightElement from '../../public/images/svg/right_element.svg';
import MiddleElement from '../../public/images/svg/middle_element.svg';

import {Row, Col, Container} from 'react-bootstrap';

const Video1 = "https://res.cloudinary.com/dmejmwxek/video/upload/v1648632770/website-shot1_v2_iqrk1b.mp4";
const Video2 = 'https://res.cloudinary.com/dmejmwxek/video/upload/v1650746448/composition_ship_secrk1.mp4';

const ShipModel = dynamic(
  () => import('../models/Ship'),
  {ssr: false}
);

const Home = () => {
  useEffect(() => {
    Aos.init({duration: 2e3});
  });
  return ( 
      <React.Fragment>
<section className="section sectionVideo">
      <video src={Video1} className="embed-responsive-item" autoPlay muted loop playsInline></video>
      <div className="videoOverlay-BottomLeft" data-aos="zoom-in">
        <h1 className="display-2" id="main-slogan">center of innovation <br></br>since 2032</h1>
        <Link href="/shop" passHref><button className="button btnBig btnRed">buy keycards</button></Link>
        <Link href="https://www.youtube.com/watch?v=sNvYMR98jgI&ab_channel=Innoporium2049" passHref><a target="_blank" rel="noopener noreferrer"> <button className="button btnBig btnBlack">watch teaser</button></a></Link>
      </div>
</section>

<section className="section sectionRed">
<Container>
  <Row>
    <h1 className="display-5 featured" data-aos="fade-in">featured</h1>
    <Col sm data-aos="fade-right">
    <div className="elementOverlay text-start">
    <Image1 alt="EO-IMG1" id="eo-img1"/>
    <hr></hr>
    <p className="overlayP">During the virus, Octatech started as a company that produced intelligent machines. They were the first ones that used quantum technology in fully working robots. The company caught Louis Patton&apos;s attention, and they started to work on a computer that would analyze and solve complex world problems in a matter of minutes. This took merely a year, and their work became the basis for the Genetic Alteration Act of 2031, which stopped the virus permanently. 
</p>
    </div>
      <LeftElement alt="leftelement" className="element leftElement"/>
    </Col>
    <Col sm data-aos="fade-up">
    <div className="elementOverlay">
    <Image2 alt="EO-IMG2" id="eo-img2"/>
      <hr></hr>
    <p className="overlayP">Before making our Pointower, Infrapoint started as a company specializing in infrastructure and architecture of regular buildings and skyscrapers. In 2038, Walter Schmitz, an architect and a member of the firm, designed building complexes which revolutionized the post-modern architecture. The implementation plan began in 2041 under the name Project Synthesis, and it finished two years later.</p>
    </div>
      <MiddleElement alt="middleelement" className="element middleElement"/>
    </Col>
    <Col sm data-aos="fade-left">
    <div className="elementOverlay text-end">
    <Image3 alt="EO-IMG3" id="eo-img3"/>
      <hr></hr>
    <p className="overlayP">Tymocorp, formerly known as Facebook and Meta, is a conglomerate comprised of hundreds of business entities. It used to have the most popular social network with 6 billions of users. Tymocorp gained its name after a second version of Metaverse, an augmented reality, released during the Second Growth in 2040. After Mark Zuckerberg&apos;s death, Magnus Tymoteus became the conglomerate&apos;s new CEO.</p>
    </div>
      <RightElement alt="rightelement" className="element rightElement"/>
    </Col>
  </Row>
  </Container>
</section>

<section className="section sectionBlack">
<video src={Video2} className="embed-responsive-item"autoPlay muted loop playsInline></video>
<div className="videoOverlay-center">
  <ShipModel/>
      </div>
</section>
</React.Fragment>
  );
}
export default Home;
