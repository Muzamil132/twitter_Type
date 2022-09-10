import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:     '79122577777-25a9nmvjs8ngqhk7gqg9mch5ptf7nbvm.apps.googleusercontent.com',
      clientSecret:'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',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.tag = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();

      session.user.uid = token.sub;
      return session;
    },
  },
});