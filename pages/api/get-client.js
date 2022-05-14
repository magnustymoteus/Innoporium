import generators from "../../lib/generators";
import { getSession } from "next-auth/react"

const GetClient_handler = async(req, res) => {
    const session = await getSession({req});
    if (!session || !session.user.profileComplete) {
        return res.status(401).send({code: "error", message: "forbidden"});
    }
    else {
        try {
            const client = await generators.getUserById(session.user.account_id);
            res.json({code:"success", user:client});
            res.end();
        }
        catch(error) {
            console.log(error);
            res.status(500).end();
        }
    }
}
export default GetClient_handler;