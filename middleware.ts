import { NextRequest, NextResponse } from "next/server";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

// https://velog.io/@pds0309/nextjs-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4%EB%9E%80

// 주어진 코드는 Next.js 13에서 사용되는 미들웨어 함수를 나타냅니다.
// 이 미들웨어 함수는 HTTP 요청이 들어왔을 때 실행되며, NextRequest와 NextResponse 모듈을 사용하여 요청과 응답을 조작하는 일종의 가로채기 역할을 합니다.

// nextjs에서 페이지를 렌더링하기 전에 서버 측에서 실행되는 함수이다.
// 즉 특정 요청 전에 무언가를 수행할 수 있게 해주는 기능이다.
// Middleware에서는 Request 객체와 Response 객체에 접근할 수 있으며
// 이를 활용해 요청 정보를 받아와 부가적인 처리를 하고 응답객체에 무언가를 추가하거나 응답을 변경할 수 있다.

// 페이지 렌더링 전에 인증을 확인하거나 요청을 확인한다.
// 요청 데이터를 사전에 처리하거나 특정 API요청을 수행하거나 캐시를 관리한다.
// 요청에 대한 응답을 변환하거나 에러를 처리할 수 있다.
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
