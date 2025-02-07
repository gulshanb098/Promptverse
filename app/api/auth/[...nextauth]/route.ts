import User from "@/models/user";
import { connectToDB } from "@/utils/dbconnector";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      if (session.user?.email) {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser) {
          (session.user as { id: string }).id =
            sessionUser._id.toString();
        }
      }
      return session;
    },
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile: any;
    }) {
      try {
        const isUserExist = await User.findOne({ email: profile.email });

        if (!isUserExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
