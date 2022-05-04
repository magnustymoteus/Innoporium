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
      const index = (rb.native)?1:0;
      if(!validateDate(rb.data[4+index]) || (!validatePhone(rb.data[5+index])) || (await generators.getUserE(rb.data[2+index]))) return res.send({code:"error", message: "User exists or invalid input"});
      const sectorNum = await generators.sector();
      const password = (rb.native)?await generators.hash(rb.data[0]):null;
      rb.data[3+index] = getGender(rb.data[3+index]);
      const birthDateVal = new Date(rb.data[4+index]).toISOString();
      await prisma.client.create({
        data: {
          firstName: rb.data[0+index],
          secondName: rb.data[1+index],
          password: password,
          gender: rb.data[3+index],
          birthDate: birthDateVal,
          phoneNumber: rb.data[5+index],
          streetName: rb.data[6+index],
          houseNumber: rb.data[7+index],
          postCode: rb.data[8+index],
          sector: sectorNum,
          email: rb.data[2+index],
          admin: 0,
          type: (rb.native)?"Native":"Other",
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