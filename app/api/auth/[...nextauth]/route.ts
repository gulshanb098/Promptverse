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
          (session.user as { id: string }).id = sessionUser._id.toString();
        }
      }
      return session;
    },

    async signIn({ profile }: { profile: any }) {
      try {
        await connectToDB();

        // Check if user already exists by email
        let existingUser = await User.findOne({ email: profile.email });

        if (existingUser) {
          return true; // ✅ User already exists, just allow login
        }

        // Generate a unique username
        let username = profile.name.replace(/\s/g, "").toLowerCase();
        let userExists = await User.findOne({ username });

        if (userExists) {
          username += Math.floor(1000 + Math.random() * 9000);
        }

        // Create a new user only if email does not exist
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });

        return true;
      } catch (error: any) {
        console.log("Error in signIn:", error.message);
        return false;
      }
    },
  },
} as NextAuthOptions);

export { handler as GET, handler as POST };
