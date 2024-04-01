import NextAuth from "next-auth"
import bcrypt from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utils/db"
import User from "@/models/User"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { name, email, password } = credentials as {
          name: string,
          email: string,
          password: string,
        };

        await connect()

        try {
          const user: any = await User.findOne({ email: email })

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            )

            if (isPasswordCorrect) {
              return user
            } else {
              throw new Error("Wrong Credentials!")
            }
          } else {
            throw new Error("User not found!")
          }
        } catch (error: any) {
          throw error
        }
      }
    })
  ],
  pages: {
    error: "/dashboard/login",
    signIn: "/dashboard",
    signOut: "/"
  },
})

export { handler as GET, handler as POST } 