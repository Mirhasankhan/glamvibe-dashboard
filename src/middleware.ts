// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { jwtDecode } from "jwt-decode";

// interface ExtendedJwtPayload {
//   role?: string;
//   userName?: string;
//   email?: string;
// }

// export async function middleware(req: Request) {
//   const cookieStore = await cookies();
//   const tokenCookie = cookieStore.get("token");

//   if (!tokenCookie || !tokenCookie.value) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   const token = tokenCookie.value;

//   try {
//     const decoded = jwtDecode<ExtendedJwtPayload>(token);

//     if (decoded.role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.log(error);
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],
// };

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

interface ExtendedJwtPayload {
  role?: string;
  userName?: string;
  email?: string;
}

export async function middleware(req: Request) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie || !tokenCookie.value) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const token = tokenCookie.value;

  try {
    const decoded = jwtDecode<ExtendedJwtPayload>(token);
    const pathname = new URL(req.url).pathname;

    if (decoded.role === "ADMIN") {
      if (pathname.startsWith("/dashboard/admin")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      }
    } else if (decoded.role === "SELLER") {
      if (pathname.startsWith("/dashboard/seller")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/dashboard/seller", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
