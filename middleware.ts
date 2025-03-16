import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    const token = await getToken({ req });

    if (token) {
        return NextResponse.next();
    }

    // Save the original URL before redirecting to login
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
};

export const config = {
    matcher: ["/my-booking", "/my-booking/:path*", "/checkout/:path*"],
};
