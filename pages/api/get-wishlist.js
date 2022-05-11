import generators from "../../lib/generators";
import { getSession } from "next-auth/react"

const GetWishlist_handler = async(req, res) => {
    const session = await getSession({req});
    if (!session || !session.user.profileComplete) {
        return res.status(401).send({code: "error", message: "forbidden"});
    }
    else {
        try {
            const wishlist = await generators.getWishlist(session.user.account_id);
            const wishlist_products = (wishlist)?await generators.getProductsFromWishlist(wishlist):null;
            const total_price = (wishlist)?wishlist_products.reduce((a,b) => (a)+((b)?b.amount*b.price:0),0):null;
            res.json({code:"success", items: wishlist_products, total: (total_price)?parseFloat(total_price.toFixed(2)):total_price});
            res.end();
        }
        catch(error) {
            console.log(error);
            res.status(500).end();
        }
    }
}
export default GetWishlist_handler;