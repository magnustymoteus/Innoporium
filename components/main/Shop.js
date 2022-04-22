import React from "react";
const ShopVideo = "https://res.cloudinary.com/dmejmwxek/video/upload/v1650576789/three_keycards_trimmed_1_j15egd.mp4";

const Shop = () => {
    return (
        <React.Fragment>
          <section className="section sectionShopIntro">
          <video src={ShopVideo} className="embed-responsive-item" autoPlay muted loop playsInline></video>
          <div className="videoOverlay-center">
              <h1 className="display-1">get now</h1>
              <h4 className="display-4">&amp; View exclusive, high-end tech.</h4>
              <div className="shop-tiers">
            <button className="button btnBig btnGreen">get tier 1</button>
            <button className="button btnBig btnBlue">get tier 2</button>
            <button className="button btnBig btnRed">get tier 3</button>
            </div>
          </div>
          </section>
          <section className="section sectionShopInfo">
            <div>
            </div>
          </section>
        </React.Fragment>
    );
}
export default Shop;
