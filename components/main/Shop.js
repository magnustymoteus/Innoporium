import React from "react";
const ShopVideo = "https://res.cloudinary.com/dmejmwxek/video/upload/v1650804124/three_keycards_trimmed_lssalm.mp4";

const Shop = () => {
    return (
        <React.Fragment>
          <section className="section sectionShopIntro">
          <video src={ShopVideo} className="embed-responsive-item" autoPlay muted loop playsInline></video>
          <div className="videoOverlay-center">
              <h1 className="display-1">get now</h1>
              <h4 className="display-4">&amp; View exclusive, high-end tech.</h4>
              <div className="shop-tiers">
            <a href="#accordion-tier1"><button className="button btnBig btnGreen">get tier 1</button></a>
            <a href="#accordion-tier2"><button className="button btnBig btnBlue">get tier 2</button></a>
            <a href="#accordion-tier3"><button className="button btnBig btnRed">get tier 3</button></a>
            </div>
          </div>
          </section>
          <section className="section sectionShopInfo">
                <div className="tierAccordion accordionGreen" id="accordion-tier1">
                  <h1>TIER 1</h1>
                    <ul>
                      <li>Infrapoint&apos;s Architectural Models</li>
                      <li>Latest Military Gear</li>
                      <li>Augmented Gadgets</li>
                      <li>Surveillance Technology</li>
                      <button className="button purchaseButton btnGreen">purchase</button>
                    </ul>
                  </div>
                  <div className="tierAccordion accordionBlue" id="accordion-tier2">
                  <h1>TIER 2</h1>
                  <ul>
                      <li>High-End Quantumbots &amp; Drones</li>
                      <li>Metaverse 3.0</li>
                      <li>Qubyte Reactors &amp; Processors</li>
                      <li>Space Technology</li>
                      <button className="button purchaseButton btnBlue">purchase</button>
                    </ul>
                  </div>
                  <div className="tierAccordion accordionRed" id="accordion-tier3">
                  <h1>TIER 3</h1>
                  <ul>
                  <h1 id="tiers-questionMark">?</h1>
                  <button className="button purchaseButton btnRed">purchase</button>
                  </ul>
                </div>
          </section>
        </React.Fragment>
    );
}
export default Shop;
