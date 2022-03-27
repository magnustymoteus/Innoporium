import generators from "../../lib/generators"
import { getSession } from "next-auth/react"
const Users_handler = async(req, res) => {
  try {
  const session = await getSession({ req });
  if (session && session.user.admin) {
    let allUsers = await generators.getAllUsers();
    res.json({code:"success", users: allUsers});
  } else {
    res.status(401);
  }
  res.end();
  }
  catch(error) {
    console.log(error);
  }
}

export default Users_handler;