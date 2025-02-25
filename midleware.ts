import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get('next-auth.session-token')?.value ||
    request.headers.get('Authorization');

  const isAuthPath =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/register';

  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/Home', request.url));
  }

  if (!token && !isAuthPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
