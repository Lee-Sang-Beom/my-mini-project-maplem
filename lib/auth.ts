import { AuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Normal",
      credentials: {
        userId: { label: "userId", type: "text" },
        userPw: { label: "userPw", type: "password" },
      },
      async authorize(
        credentials: Record<"userId" | "userPw", string> | undefined
      ) {
        if (credentials) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
          });
          const json = await res.json();
          if (json.status === 200) {
            return json.data;
          } else {
            throw new Error(JSON.stringify(json));
          }
        } else {
          alert("plz check crediental");
        }
      },
    }),
  ],
  // 인증 프로세스 중 다양한 시점에서 호출되는 함수
  callbacks: {
    // 서버한테서 로그인하고 get,post 하려면 로그인 시 token 받음
    async jwt({ token, user }: { token: JWT; user: User | AdapterUser }) {
      // authorize 메서드에서 반환된 사용자 객체 (로그인 시에만 제공됩니다)
      if (user) {
        token.user = user;
      }
      return token;
    },
    // JWT (JSON Web Token)의 생성과 검증을 사용자 정의하고 조작할 수 있게 합니다.
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = token.user;
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (!url.includes("http")) {
        return "http://localhost:3000" + url;
      }
      return url;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30days
  },
};
