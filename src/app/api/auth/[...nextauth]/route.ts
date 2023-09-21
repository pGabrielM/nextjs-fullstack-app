import NextAuth from "next-auth"
import bcrypt from "bcryptjs"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import connect from "@/utils/db"
import User from "@/models/User"

export interface IUser {
  name: string;
  email: string;
  password: string
}


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

      async authorize(credentials: IUser) {

        await connect()

        try {
          const user = User.findOne({ email: credentials.email })

          if(user) {
            const isPasswordCorret = await bcrypt.compare(credentials.password, user.password)

            
          } else{
            throw new Error("User not found!")
          }
        } catch (error: any) {
          throw new Error(error)
        }
      }
    })
  ],
})

export { handler as GET, handler as POST } 