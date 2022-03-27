import prisma from "../../lib/prisma";
import custom_regex from '../../lib/regex';
import generators from '../../lib/generators';

const Register_handler = (req, res) => {
  const validateDate = (date) => date.length==10;
  const validatePhone = (phone) => new RegExp(custom_regex.phone).test(phone.replace(/\s/g, ''))
  const getGender = (gender) => (gender[0]==='M')?'M':'F';
  return new Promise(async(resolve) => {
    try {
      const rb = req.body;
      if (req.method !== 'POST') {
        res.status(405).send({code:"error", message: 'Only POST requests allowed' });
        return;
      }
      if(!validateDate(rb.data[5]) || (!validatePhone(rb.data[6])) || (await generators.getUserE(rb.data[2]))) return res.send({code:"error", message: "User exists or invalid input"})
      const sectorNum = await generators.sector();
      const hashedPassword = await generators.hash(rb.data[3]);
      rb.data[4] = getGender(rb.data[4]);
      const birthDateVal = new Date(rb.data[5]).toISOString();
      await prisma.client.create({
        data: {
          firstName: rb.data[0],
          secondName: rb.data[1],
          password: hashedPassword,
          gender: rb.data[4],
          birthDate: birthDateVal,
          phoneNumber: rb.data[6],
          streetName: rb.data[7],
          houseNumber: rb.data[8],
          postCode: rb.data[9],
          sector: sectorNum,
          email: rb.data[2],
        }
      });
      return res.send({code:"success"});
     } catch(error) {
      console.log(error);
      res.status(500).end();
      return resolve();
  }
  });
}

export default Register_handler;