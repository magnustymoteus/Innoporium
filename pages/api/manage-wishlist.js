import { getSession } from "next-auth/react"
import generators from "../../lib/generators";

const ManageUser_handler = async(req, res) => {
    const session = await getSession({req});
    if (!session || !session.user.profileComplete) {
        console.log(session);
        return res.status(401).send({code: "error", message: "forbidden"});
    }
    if (req.method !== 'POST') {
        return res.status(405).send({code:"error", message: 'Only POST requests allowed' });
    }
    else {
        try {
            const rb = req.body;
            switch(rb.crud) {
                case "add":
                    await generators.addToWishlist(rb.clientID, rb.productID);
                    break;
                case "delete":
                    await generators.deleteFromWishlist(rb.clientID, rb.productID);
                    break;
            }
            res.json({code:"success"});
        }
        catch(error) {
            console.log(error);
            res.status(500).end();
        }
    }
    res.end();
}
export default ManageUser_handler;