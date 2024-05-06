import {
  DEFAULT_REDIRECT_URL,
  apiAuthRoutes,
  authRoutes,
  dashboardRoutes,
} from "@/routes";
import { paths } from "./lib/paths";
import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  //Special Context
  const isAPIAuthRoute = nextUrl.pathname.startsWith(apiAuthRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isDashboard = dashboardRoutes.includes(nextUrl.pathname);

  if (isAPIAuthRoute) {
    return NextResponse.next();
  }
  if (nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_URL, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL(paths.auth.signin, nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
