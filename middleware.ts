//middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
//we specify our auth routes
const authRoutes = ["/sign-in", "/sign-up"];
//we specify our password routes
const passwordRoutes = ["/reset-password", "/forgot-password","/email-verified","/","/robots.txt","/sitemap.xml","/sitemap-0.xml","/opengraph-image.png","/favicon.ico"];

const deniedRoutes = [
  "/admin"
];


export default async function authMiddleware(request: NextRequest) {
//we get the pathname to which route we are in
  const pathName = request.nextUrl.pathname;
  //if we are in the authRoutes this returns true
  const isAuthRoute = authRoutes.includes(pathName);
  //if we are in the passwordRoutes this returns true
  const isPasswordRoute = passwordRoutes.includes(pathName);
  //we use this to get the snippet to get the session
  //this fetches the session in /api/auth/get-session api routes
  const isDeniedRoute = deniedRoutes.includes(pathName);

  const session = getSessionCookie(request);

  // if (!session) {
  // //if no session is found allow AuthRoutes and Passwordroutes 
  //   if (isAuthRoute || isPasswordRoute) {
  //     return NextResponse.next();
  //   }
  // //if trying to access any other route return to sign-in page
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }


  // if (isAuthRoute || isPasswordRoute) {
  // //if session is found but wants to access auth routes and password routes
  // //redirect to homepage
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // If the route is in deniedRoutes and the user has no session → redirect to sign-in
  // if (isDeniedRoute && !session) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};