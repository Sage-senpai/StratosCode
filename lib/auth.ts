import NextAuth, { type DefaultSession } from "next-auth";
import Cognito from "next-auth/providers/cognito";
import Credentials from "next-auth/providers/credentials";
import { isDevMock } from "./dev-mode";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      tenantId: string;
    } & DefaultSession["user"];
  }
}

type ExtendedJWT = {
  userId?: string;
  tenantId?: string;
  sub?: string;
  [key: string]: unknown;
};

const providers = [];

if (
  process.env.COGNITO_CLIENT_ID &&
  process.env.COGNITO_CLIENT_SECRET &&
  process.env.COGNITO_ISSUER
) {
  providers.push(
    Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
    }),
  );
}

// Dev-only credentials provider — activated by STRATOSCODE_DEV_MOCK=true.
// Allows local sign-in without a Cognito pool. Never enable in production.
if (isDevMock()) {
  providers.push(
    Credentials({
      id: "dev",
      name: "Dev sign-in",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const email = (credentials?.email as string | undefined) ?? "dev@stratoscode.local";
        return {
          id: `dev-${email}`,
          email,
          name: email.split("@")[0],
          tenantId: "dev-tenant",
        };
      },
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user, profile }) {
      const t = token as ExtendedJWT;
      if (user) {
        t.userId = (user.id as string | undefined) ?? t.sub ?? `user-${Date.now()}`;
        t.tenantId =
          (user as { tenantId?: string }).tenantId ??
          (profile?.["custom:tenantId"] as string | undefined) ??
          "default-tenant";
      }
      return t;
    },
    async session({ session, token }) {
      const t = token as ExtendedJWT;
      if (t.userId) session.user.id = t.userId;
      if (t.tenantId) session.user.tenantId = t.tenantId;
      return session;
    },
  },
  trustHost: true,
});
