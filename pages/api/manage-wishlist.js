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
                    await generators.addToItems(rb.clientID, rb.productID);
                    break;
                case "delete":
                    await generators.deleteFromItems(rb.clientID, rb.productID);
                    break;
                case "checkout":
                    const client = await generators.getUserById(session.user.account_id);
                    if(rb.totalPrice<=client.ubits) {
                    let receipt_arr = new Array();
                    rb.products.map((item) => {
                        receipt_arr.push({"description": item.name, "amount": item.amount});
                    });
                    const details = await generators.checkout(rb.clientID, rb.totalPrice);
                    await generators.sendEmail(session.user.firstName, details.id, new Date().toLocaleString(), receipt_arr, rb.totalPrice+" Ubits", session.user.email);
                    break;
                    }
                    else {
                        res.status(401).json({code: "error", message: "forbidden"});
                        return;
                    }
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