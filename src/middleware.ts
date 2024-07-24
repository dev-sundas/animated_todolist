import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

{/*export async function middleware(request: NextRequest) {
  let jwtToken = request.cookies.get("token")?.value;
  if (jwtToken) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload, protectedHeader } = await jose.jwtVerify(jwtToken, secret);
    const headers = new Headers(request.headers);
    headers.set("user", JSON.stringify(payload.email));
    headers.set("userId", JSON.stringify(payload.id));

   {/* console.log("headers", headers);
    console.log("payload", payload);
     console.log("runned middle ", headers.get("userId"));*/}

   {/* return NextResponse.next({
      request: {
        headers: headers,
      },
    });
  }
  return NextResponse.redirect(new URL("/signIn", request.url));
}

{/*export const config = {
  matcher: ["/", "/api/todo"],
};*/}



export async function middleware(request: NextRequest) {
 

  const jwtToken = request.cookies.get("token")?.value;
  
  if (jwtToken) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jose.jwtVerify(jwtToken, secret);
      const headers = new Headers(request.headers);
      headers.set("user", JSON.stringify(payload.email));
      headers.set("userId", JSON.stringify(payload.id));
      return NextResponse.next({
        request: {
          headers: headers,
        },
      });
    } catch (error) {
      console.error('JWT verification failed:', error);
      return NextResponse.redirect(new URL("/signIn", request.url));
    }
  }

  return NextResponse.redirect(new URL("/signIn", request.url));
}

export const config = {
  matcher: ["/", "/api/todo"],
};

