import { NextRequest, NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

// 주어진 코드는 Next.js 13에서 사용되는 미들웨어 함수를 나타냅니다.
// 이 미들웨어 함수는 HTTP 요청이 들어왔을 때 실행되며, NextRequest와 NextResponse 모듈을 사용하여 요청과 응답을 조작하는 일종의 가로채기 역할을 합니다.

export default withAuth(
  function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-url", request.url);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },

  // middleware의 callbacks는 요청이 있을때마다, authorized가 실행됨
  // token !== null 이면 로그인된상태임
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return true;
      },
    },
  }
);

// export const config = { matcher: ["/dashboard"] } : dashboard에만 인증이필요하며, 사용자가 이 때 페이지 방문시 로그인을 안했으면 로그인 페이지로 리디렉션함
