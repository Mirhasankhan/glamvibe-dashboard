// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";
// import { JWTDecode } from "./jwt";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const { token } = JWTDecode();

//   if (!token) {
//     if (pathname.startsWith("/dashboard")) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     return NextResponse.next();
//   }

//   let decodedData: any;
//   try {
//     decodedData = jwtDecode(token);
//   } catch (error) {
//     console.error("Invalid token:", error);
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   const role = decodedData?.role;

//   if (pathname.startsWith("/dashboard") && role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };
