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
            if(user && user.type === "native") {
                return {
                  account_id: user.id,
                  native: true,
                  firstName: user.firstName,
                  secondName: user.secondName,
                  sector: user.sector,
                  email: user.email,
                  admin: user.admin,
                  image: generators.getRandPImg(),
                  provider: "native",
                  ubits: user.ubits,
                  profileComplete: true,
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
            profile: async(profile) => {
              let user = await generators.getNonNativeUser(profile.email);
              return {
                account_id: (user)?user.id:null,
                native: false,
                profileComplete: (user)?true:false,
                id: profile.id,
                name: profile.login,
                image: profile.avatar_url,
                email: profile.email,
                provider: "github",
                ubits: (user)?user.ubits:null,
              }
            }
        }),
        DiscordProvider({
          profile: async(profile) => {
            let userAvatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
            let user = await generators.getNonNativeUser(profile.email);
            return {
                account_id: (user)?user.id:null,
                native: false,
                profileComplete: (user)?true:false,
                id: profile.id,
                snowflake: profile.id,
                name: profile.username,
                image: userAvatar,
                email: profile.email,
                provider: "discord",
                ubits: (user)?user.ubits:null,
            }
          },
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