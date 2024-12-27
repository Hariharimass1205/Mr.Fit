import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ROUTES = new Set(["/admin/dashboard","/admin/coachList","/admin/userList","/admin/enrolledUserList"]);
const COACH_ROUTES = new Set(["/coaches/becomeACoach","/coaches/studentsList","/coaches/chatPage","/coaches/coachProfile","/coaches/quiz","/coaches/coachFillup","/coaches/greetings"]);
const USER_ROUTES = new Set(["/user/home","/user/chatPage","/user/payment","/user/profile","/user/FreeWorkOutPlans","/user/coachDetails","/user/coachList","/coaches/becomeACoach","/coaches/coachProfile","/coaches/quiz","/coaches/coachFillup","/coaches/greetings"]);
const PUBLIC_ROUTES = new Set([
  "/login", 
  "/signup",
  "/otp", 
  "/forgotPassword/forgotPassword1", 
  "/forgotPassword/forgotPasswordOTP",
  "/forgotPassword/forgotPassword3",
  "/admin/login",
  "/user/coachList",
  "/user/payment",
  "/user/successPage"
]);
const UNPROTECTED_ROUTES = new Set(["/_next/", "/favicon.ico", "/api/"]);
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if ([...UNPROTECTED_ROUTES].some(route => pathname.startsWith(route)) || pathname === "/user/home") {
      console.log(`Allowing access to public route: ${pathname}`);
      return NextResponse.next();
    }
    if (PUBLIC_ROUTES.has(pathname)) {
        console.log(`Allowing access to public page: ${pathname}`);
        return NextResponse.next();
      }
      const tokenData = await verifyToken("accessToken", req);
      const role = tokenData?.role;
      if (!role) {
        console.log(`Redirecting unauthenticated user from ${pathname} to /login`);
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (role == "admin" && !ADMIN_ROUTES.has(pathname)) {
    console.log(`Unauthorized access attempt by admin to ${pathname}. Redirecting to /admin`);
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (role == "coach" && !COACH_ROUTES.has(pathname)) {
    console.log(`Unauthorized access attempt by doctor to ${pathname}. Redirecting to /home`);
    return NextResponse.redirect(new URL("/user/home", req.url));
  }
  if (role == "user" && !USER_ROUTES.has(pathname)) {
    console.log(`Unauthorized access attempt by user to ${pathname}. Redirecting to /userHome`);
    return NextResponse.redirect(new URL("/user/home", req.url));
  }
  console.log(`Allowing access to ${pathname} for role: ${role}`);
  return NextResponse.next();
}

/////////////////////////////////////////////////////////////////////////////////////////

async function verifyToken(tokenName: string, req: NextRequest): Promise<{ role:string | null }> {
    const token = req.cookies.get(tokenName);
    console.log(token,"from verify fn middle")
    if (!token?.value) {
      console.error("Token not found in cookies");
      return { role: null };
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return { role: null };
    }
  
    try {
      const { payload } = await jwtVerify(token.value, new TextEncoder().encode(secret));
      console.log("payload")
      const role = payload?.role as string | undefined;
  
      if (!role) {
        console.error("Role not found in token payload");
        return { role: null };
      }
      return { role };
    } catch (err:any) {
      console.error(`Failed to verify token: ${err.message}`);
      return { role: null };
    }
  }
  