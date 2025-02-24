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
  "/user/videoCall",
  "/user/coachList",
  "/user/payment",
  "/user/successPage"
]);
const UNPROTECTED_ROUTES = new Set(["/_next/", "/favicon.ico", "/api/"]);

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const tokenData = await verifyToken("refreshToken", req );
    const role = tokenData?.role;
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, must-revalidate");
    if(!tokenData){
      localStorage.removeItem('user');
    }
    if ([...UNPROTECTED_ROUTES].some(route => pathname.startsWith(route)) || pathname === "/user/home") {
      console.log(`Allowing access to public route: ${pathname}`);
      return NextResponse.next();
    }
    if (PUBLIC_ROUTES.has(pathname)) {
        console.log(`Allowing access to public page: ${pathname}`);
        return NextResponse.next();
      }
      if (!role ) {
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

//////////////////////////////////////      /      //////////////////////////////////////////////

async function verifyToken(tokenName: string, req: NextRequest): Promise<{ role:string | null }> {
    const tokenHeader = req.cookies.get("refreshToken");
    if (!tokenHeader?.value) {
      console.log("Token not found in cookies");
      return { role: null };
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT_SECRET is not defined in environment variables");
      return { role: null };
    }
    try {
      const { payload } = await jwtVerify(tokenHeader.value, new TextEncoder().encode(secret));
      const role = payload?.role as string | undefined;
  
      if (!role) {
        console.log("Role not found in token payload");
        return { role: null };
      }
      return { role };
    } catch (err:any) {
      console.log(`Failed to verify token: ${err.message}`);
      return { role: null };
    }
  }
  