import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { loginUser } from "@/app/actions/auth/login";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const { email, password } = credentials;

                const user = await loginUser({ email, password });
                console.log(user);
                if (user) {
                    return {
                        id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                    };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
