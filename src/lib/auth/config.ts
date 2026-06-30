import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { prisma } from "@/lib/db/client";
import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      provider?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    sub?: string;
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // OAuth hesabı varsa provider bilgisini user nesnesine ekle
      if (account) {
        (user as any).provider = account.provider;
        (user as any).providerAccountId = account.providerAccountId;
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        // OAuth provider'ı sakla
        token.provider = (user as any).provider as string;
        token.providerAccountId = (user as any).providerAccountId as string;
        token.email = user.email as string;
      }
      // Provider'a göre user'ı bul (raw SQL - Prisma v7'de provider kolonu type-safe değil)
      if (token.email && token.provider) {
        let dbUser: { id: string; role: string } | null = null;
        
        if (token.provider === 'google') {
          const result = await prisma.$queryRaw<Array<{ id: string; role: string }>>(
            Prisma.sql`SELECT id, role FROM users WHERE email = ${token.email} AND provider = 'google' LIMIT 1`
          );
          dbUser = result[0] || null;
        } else if (token.provider === 'github') {
          const result = await prisma.$queryRaw<Array<{ id: string; role: string }>>(
            Prisma.sql`SELECT id, role FROM users WHERE email = ${token.email} AND provider = 'github' LIMIT 1`
          );
          dbUser = result[0] || null;
        }
        
        if (!dbUser) {
          // Eşleşen provider yoksa, yeni user oluştur
          const newUserId = randomUUID();
          await prisma.$executeRaw`
            INSERT INTO users (id, email, name, role, provider)
            VALUES (${newUserId}, ${token.email}, ${user.name || null}, 'user', ${token.provider})
          `;
          dbUser = { id: newUserId, role: 'user' };
        }
        
        if (dbUser) {
          token.sub = dbUser.id;
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub as string;
      }
      if (token.provider) {
        session.user.provider = token.provider as string;
      }
      // JWT'den session'a role bilgisini aktar
      if (token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
