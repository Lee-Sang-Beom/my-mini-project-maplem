import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    userId: string;
    userPw: string | null;
  }

  interface Session {
    user: User;
  }
}

// next-auth/jwt 하위 모듈에는 JWT와 관련된 인터페이스가 정의되어 있습니다. 이러한 인터페이스를 Augmentation하여 필요한 추가 정보를 포함할 수 있습니다.
declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
