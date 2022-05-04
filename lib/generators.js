import CryptoJS from 'crypto-js';
import prisma from "../lib/prisma";

const get_rand_pImg = () => {
    const randomInt = Math.floor(Math.random() * 4)+1;
    const urlBegin = `https://res.cloudinary.com/dmejmwxek/image/upload/v1651499272/profile_pictures/0${randomInt}.png`;
    return urlBegin;
  }
const generate_sector = async() => {
    return `${(Math.random() + 1).toString(36).substring(7)}-${Math.floor(Math.random() * 10)}`.toUpperCase();
}
const hash = async(value) => {
    return CryptoJS.SHA256(value).toString();
} 
const change_admin = async(idArg, adminArg) => {
    try {
    const updateClient = await prisma.client.update({
        where: {
            id: idArg,
        },
        data: {
            admin: adminArg,
        }
    });
    return updateClient;
    }
    catch(error) {
        console.log(error);
    }
}
const delete_user = async(idArg) => {
    try {
        const deleteClient = await prisma.client.delete({
            where: {
                id: idArg,
            }
        });
        return deleteClient;
    }
    catch(error) {
        console.log(error);
    }
}
const get_all_users = async() => {
    try {
        let users = await prisma.client.findMany({
            select: {
                id: true,
                firstName: true,
                secondName: true,
                email: true,
                gender: true,
                phoneNumber: true,
                streetName: true,
                houseNumber: true,
                postCode: true,
                birthDate: true,
                sector: true,
                admin: true,
            }
        });
          if(users[0]) {
            return users
          }
    }
    catch(error) {
        console.log(error);
    }
}
const get_user_by_EP = async(emailArg, passwordArg) => {
    try {
        const hashedPasswordArg = await generators.hash(passwordArg);
        const user = await prisma.client.findMany({
            select: {
              firstName: true,
              secondName: true,
              password: true,
              sector: true,
              email: true,
              admin: true,
              type: true,
            },
            where: {
                email: emailArg,
                password: hashedPasswordArg,
             },
          });
          if(user[0]) {
            if(emailArg==user[0].email && hashedPasswordArg==user[0].password) return user;
          }
    }
    catch(error) {
        console.log(error);
    }
}
const get_user_by_e = async(emailArg) => {
    try {
        const user = await prisma.client.findMany({
            select: {
              email: true,
              type: true,
            },
            where: {
                email: emailArg,
             },
          });
          if(user[0] && user[0].type==="Native") { 
              return true;
         }
    }
    catch(error) {
        console.log(error);
    }
}
const get_non_native_user = async(emailArg) => {
    try {
        const user = await prisma.client.findMany({
            select: {
                email: true,
                type: true,
            },
            where: {
                email: emailArg,
            },
        });
        if(user[0] && user[0].type==="Other") {
            return true;
        }
    }
    catch(error) {
        console.log(error);
    }
}
const generators = {
    sector: generate_sector,
    hash: hash,
    getUserEP: get_user_by_EP,
    getUserE: get_user_by_e,
    getAllUsers: get_all_users,
    changeAdmin: change_admin,
    deleteUser: delete_user,
    getRandPImg: get_rand_pImg,
    getNonNativeUser: get_non_native_user,
}

export default generators;