import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/editor(.*)",
  "/bookmarks(.*)",
  "/settings(.*)",
  "/history(.*)",
]);

const isProtectedAPIRoute = createRouteMatcher(["/api(.*)", "/api/generator"]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (!auth().userId && isProtectedAPIRoute(req)) {
    return NextResponse.json(
      { error: "Unothorized request!" },
      { status: 400 }
    );
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
