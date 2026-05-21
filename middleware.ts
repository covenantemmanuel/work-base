import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const protectedPaths = ['/dashboard', '/profile', '/settings', '/admin'];
  const hasSession = !!req.cookies.get('__session');
  if (protectedPaths.some((p) => req.nextUrl.pathname.startsWith(p)) && !hasSession) return NextResponse.redirect(new URL('/login', req.url));
  return NextResponse.next();
}
