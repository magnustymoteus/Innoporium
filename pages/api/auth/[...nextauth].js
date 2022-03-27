import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from 'next-auth/providers/credentials';
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma";
import generators from "../../../lib/generators";

export default NextAuth({
    providers: [
        CredentialsProvider({
            adapter: PrismaAdapter({prisma}),
            name: 'Innoporium',
            credentials: {
                firstName: { label: "firstName", type: "text"},
                secondName: { label: "secondName", type: "text"},
                sector: { label: "sector", type: "text"},
                email: { label: "Email", type: "text"},
                admin: { label: "admin", type: "number"},
              },
            authorize: async(credentials) => {
            try {
            let user = await generators.getUserEP(credentials.email, credentials.password);
            if(user) {
                return {
                  firstName: user[0].firstName,
                  secondName: user[0].secondName,
                  sector: user[0].sector,
                  email: user[0].email,
                  admin: user[0].admin,
                }
            }
            return null;
            }
            catch(error) {
                console.log(error);
            }
        },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET,
        }),
    ],
    pages: {
        signIn: "/sign-in"
    },
    callbacks: {
        jwt: ({token, user}) => {
            if (user) {
              const { accessToken, ...rest } = user;
              token.accessToken = accessToken;
              token.user = rest;
            }
            return token;
          },
          session : ({session, token}) => {
            session.user = {
              ...session.user,
              ...token.user,
            };
            session.accessToken = token.accessToken;
            return session;
          },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.SECRET,
});