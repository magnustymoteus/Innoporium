import CryptoJS from 'crypto-js';
import prisma from "../lib/prisma";

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
            },
            where: {
                email: emailArg,
             },
          });
          if(user[0]) { 
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
}

export default generators;