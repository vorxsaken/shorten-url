import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = { matcher: '/userLinks'};

export function middleware(req: NextRequest) {
    const session = req.cookies.get('next-auth.session-token');

    if(session) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', req.url));
}
