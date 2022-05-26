import CryptoJS from 'crypto-js';
import prisma from "../lib/prisma";
import sendgrid from "@sendgrid/mail";

const send_email = async(nameArg, receiptIdArg, dateArg, receiptDetailsArg, totalArg, emailArg) => {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
    await sendgrid.send({
        templateId: "d-240f5e6dc3fb4e7bb2bbb2b96ce4d1e6",
        dynamicTemplateData: {
          name: nameArg,
          receipt_id: `Transaction Id: ${receiptIdArg}`,
          date: `Date: ${dateArg.toLocaleString("en-US").slice(0,10)} ${dateArg.toLocaleString("en-US").slice(11,19)}`,
          receipt_details: receiptDetailsArg,
          total: totalArg,
        },
        to: emailArg,
        from: process.env.SENDGRID_EMAIL, 
        subject: `Receipt - Innoporium 2049`,
        html: `<div>You've got a mail</div>`,
      });
}

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
                type: true,
                ubits: true,
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
const get_user_by_id = async(idArg) => {
    try {
        const user = await prisma.client.findMany({
            where: {
                id: idArg,
            },
            select: {
              id: true,
              firstName: true,
              secondName: true,
              password: true,
              sector: true,
              email: true,
              admin: true,
              type: true,
              ubits: true,
            }
        });
        if(user[0]) {
            return user[0];
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
              id: true,
              firstName: true,
              secondName: true,
              password: true,
              sector: true,
              email: true,
              admin: true,
              type: true,
              ubits: true,
            },
            where: {
                email: emailArg,
                password: hashedPasswordArg,
             },
          });
          if(user[0]) {
            if(emailArg==user[0].email && hashedPasswordArg==user[0].password) return user[0];
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
          if(user[0] && user[0].type==="native") { 
              return true;
         }
         return false;
    }
    catch(error) {
        console.log(error);
    }
}
const get_non_native_user = async(emailArg) => {
    try {
        const user = await prisma.client.findMany({
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
                type: true,
                ubits: true,
            },
            where: {
                email: emailArg,
            },
        });
        if(user[0] && user[0].type!=="native") {
            return user[0];
        }
        return false;
    }
    catch(error) {
        console.log(error);
    }
}
const get_items = async(idArg) => {
    try {
        const items = await prisma.items.findMany({
            select: {
                id: true,
                clientID: true,
                productID: true,
                amount: true,
            },
            where: {
                AND: [
                {clientID: idArg},
                {transactionID: null},
                ],
            }
        });
        if(items[0]) {
            return items;
        }
        return false;
    }
    catch(error) {
        console.log(error);
    }
}
const get_products_from_items = async(wishlist) => {
    let productsIDs = new Array();
    for(let product of wishlist) {
        productsIDs.push(product.productID);
    }
    try {
        const products_result = await prisma.products.findMany({
            where: {
                id: {in: productsIDs},
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                inStock: true,
                image: true,
            },
        });
        products_result.forEach((item) => {
            wishlist.forEach((wishlist_item) => {
                if(item.id===wishlist_item.productID) item.amount=wishlist_item.amount;
            }); 
        });
        return products_result;
    }
    catch(error) {
        console.log(error);
    }
}
const add_to_items = async(clientIdArg, productIdArg) => {
    try {
        const findItem = await prisma.items.updateMany({
            where: {
                AND: [
                  { clientID: clientIdArg },
                  { productID: productIdArg},
                  { transactionID: null },
                ],
              },
            data: {
                amount: {
                    increment: 1,
                }
            }
        });
        if(!findItem.count) {
            const createItem = await prisma.items.create({
                data: {
                    amount: 1,
                    clientID: clientIdArg,
                    productID: productIdArg,
                }
            });
            return createItem;
        }
        return findItem;
    }
    catch(error) {
        console.log(error);
    }
}
const delete_from_items = async(clientIdArg, productIdArg) => {
    try {
        const findItem = await prisma.items.updateMany({
            where: {
                AND: [
                  { clientID: clientIdArg },
                  { productID: productIdArg},
                  { transactionID: null },
                  {amount: {
                    gt: 1,
                  }},
                ],
              },
            data: {
                amount: {
                    decrement: 1,
                }
            }
        });
        if(!findItem.count) {
            const deleteItem = await prisma.items.deleteMany({
                where: {
                    AND: [
                    {amount: 1},
                    {clientID: clientIdArg},
                    {productID: productIdArg},
                    { transactionID: null },
                      ],
                }
            });
            return deleteItem;
        }
        return findItem;
    }
    catch(error) {
        console.log(error);
    }
}
const checkout = async(clientIdArg, costArg) => {
    try {
        const transaction = await prisma.transactions.create({
            data: {
                date: new Date().toISOString(),
                cost: costArg,
            }
        });
        await prisma.items.updateMany({
            where: {
                AND: [
                    {clientID: clientIdArg},
                    {transactionID: null},
                ]
            },
            data: {
                transactionID: transaction.id,
            }
        });
        await prisma.client.update({
            where: {
                id: clientIdArg,
            },
            data: {
                ubits: {
                    decrement: costArg,
                }
            }
        });
        return transaction;
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
    getUserById: get_user_by_id,
    getAllUsers: get_all_users,
    changeAdmin: change_admin,
    deleteUser: delete_user,
    getRandPImg: get_rand_pImg,
    getNonNativeUser: get_non_native_user,
    getItems: get_items,
    getProductsFromItems: get_products_from_items,
    addToItems: add_to_items,
    deleteFromItems: delete_from_items,
    checkout: checkout,
    sendEmail: send_email,
}

export default generators;