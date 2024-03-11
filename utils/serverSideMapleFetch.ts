import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function serverSideMapleFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const urlObj = new URL(input.toString());
  const path = urlObj.pathname;
  const query = urlObj.search;

  const url = process.env.NEXT_PUBLIC_MAPLE_HOST + path + query;
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    return fetch(url, {
      ...init,
      //@ts-ignore
      headers: {
        //@ts-ignore
        "x-nxopen-api-key": process.env.NEXT_PUBLIC_MAPLE_SECRET,
      },
    });
  }

  const user = session?.user;

  //  const jwtAuthToken = user ? user.jwtAuthToken : "";
  //   const jwtRefreshToken = user ? user.jwtRefreshToken : "";
  const etcHeaderProps = [
    {
      withCredentials: true,
      "x-nxopen-api-key": process.env.NEXT_PUBLIC_MAPLE_SECRET,
    },
  ];

  return fetch(url, {
    ...init,
    //@ts-ignore
    headers: {
      ...init?.headers,
      ...etcHeaderProps,
    },
  });
}
