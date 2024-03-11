import { cookies } from "next/headers";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function serverSideFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  if (input.toString().includes("/api/file")) {
    return fetch(input, init);
  }

  const urlObj = new URL(input.toString());
  const path = urlObj.pathname;
  const query = urlObj.search;
  const changePath = path.replace("/api", "/bapi");
  const url = process.env.NEXT_PUBLIC_HOST + changePath + query;

  const cookieName = "deps";
  const found = cookies().get(cookieName);
  const session: Session | null = await getServerSession(authOptions);

  // if (!found) return fetch(url, init);
  if (!session) return fetch(url, init);

  const user = session?.user;

  //   const jwtAuthToken = user ? user.jwtAuthToken : "";
  //   const jwtRefreshToken = user ? user.jwtRefreshToken : "";

  return fetch(url, {
    ...init,
    //@ts-ignore
    headers: {
      ...init?.headers,
      //   "X-AUTH-TOKEN": jwtAuthToken,
      //   Cookie: "X-REFRESH_TOKEN=" + jwtRefreshToken,
      //@ts-ignore
      withCredentials: true,
    },
  });
}
