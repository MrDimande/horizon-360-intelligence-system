import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch("http://127.0.0.1:8000/auth/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              username: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
        // If login failed, return null to display error
            return null;
          }

          const user = await res.json();

          if (user && user.access_token) {
        // Return user object with token
        // In a real app we would decode token to get user info
            return {
              id: credentials.email, // using email as id for now
              email: credentials.email,
              name: credentials.email.split("@")[0],
              accessToken: user.access_token,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "dev-secret-key-change-in-prod",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

