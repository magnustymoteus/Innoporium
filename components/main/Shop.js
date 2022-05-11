import React, {useEffect} from "react";
import { useSession } from "next-auth/react";
const ShopVideo = "https://res.cloudinary.com/dmejmwxek/video/upload/v1650804124/three_keycards_trimmed_lssalm.mp4";
const ShopVideo2 = "https://res.cloudinary.com/dmejmwxek/video/upload/v1651062983/blueprint_render_zy9zde.mp4";
import Aos from 'aos';

const Shop = () => {
  const {data: session} = useSession();
  const addToWishlist = async(productIdArg, actionArg) => {
    try {
      if(session && session.user.profileComplete) {
      const res = await fetch('/api/manage-wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({clientID: session.user.account_id, productID: productIdArg, crud: actionArg}),
      });
      const result = await res.json();
      if(result.code !== "success") throw result.code;
    }
    }
    catch(error) {
      console.log(error);
    }
    }
  useEffect(() => {
    Aos.init({duration: 1e3});
  });
    return (
        <React.Fragment>
          <section className="section sectionShopIntro">
          <video src={ShopVideo} className="embed-responsive-item" autoPlay muted loop playsInline></video>
          <div className="videoOverlay-center">
              <h1 className="display-1">get a keycard now</h1>
              <h4 className="display-4">&amp; View exclusive, high-end tech.</h4>
              <div className="shop-tiers">
            <a href="#loc1"><button className="button btnBig btnGreen">get tier 1</button></a>
            <a href="#loc2"><button className="button btnBig btnBlue">get tier 2</button></a>
            <a href="#loc3"><button className="button btnBig btnRed" id="loc1">get tier 3</button></a>
            </div>
          </div>
          </section>
          <section className="section sectionShopInfo">
                <div className="accordionGreen-wrapper">
                <div className="tierAccordion accordionGreen" data-aos="fade-in" id="loc2">
                  <h1>TIER 1</h1>
                    <ul>
                      <li>Infrapoint&apos;s Architectural Models</li>
                      <li>Latest Military Gear</li>
                      <li>Augmented Gadgets</li>
                      <li>Surveillance Technology</li>
                      <button className="button purchaseButton btnGreen" onClick={() => addToWishlist(1, "add")}>add to wishlist <br/><small className="ubit">U 3.23</small></button>
                    </ul>
                  </div>
                  </div>
                  <div className="accordionBlue-wrapper">
                  <div className="tierAccordion accordionBlue" data-aos="fade-in" id="loc3">
                  <h1>TIER 2</h1>
                  <ul>
                      <li>High-End Quantumbots &amp; Drones</li>
                      <li>Metaverse 3.0</li>
                      <li>Qubyte Reactors &amp; Processors</li>
                      <li>Space Technology</li>
                      <button className="button purchaseButton btnBlue" onClick={() => addToWishlist(2, "add")}>add to wishlist <br/><small className="ubit">U 6.29</small></button>
                    </ul>
                  </div>
                  </div>
                  <div className="accordionRed-wrapper">
                  <div className="tierAccordion accordionRed" data-aos="fade-in">
                  <h1>TIER 3</h1>
                  <ul>
                      <li>Teleportation Technology</li>
                      <li>Private Space Tour To <mark>[REDACTED]</mark></li>
                      <li>Reading Access To <mark>[REDACTED]</mark> Research</li>
                      <li><mark>[REDACTED]</mark></li>
                  <button className="button purchaseButton btnRed" onClick={() => addToWishlist(3, "add")}>add to wishlist <br/><small className="ubit">U 9.19</small></button>
                  </ul>
                </div>
                </div>
          </section>
          <section className="section sectionShopOutro">
          <video src={ShopVideo2} className="embed-responsive-item" autoPlay muted loop playsInline></video>
          </section>
        </React.Fragment>
    );
}
export default Shop;
