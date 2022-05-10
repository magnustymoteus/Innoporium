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
            const wishlist_products = await generators.getProductsFromWishlist(wishlist);
            res.json({code:"success", items: wishlist_products});
            res.end();
        }
        catch(error) {
            console.log(error);
            res.status(500).end();
        }
    }
}
export default GetWishlist_handler;