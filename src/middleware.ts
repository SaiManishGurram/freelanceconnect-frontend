// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware to check user role
export function middleware(req: NextRequest) {
  // Check if there is a token (assuming you are using cookies to store token)
  const token = req.cookies.get('token')?.value;
    
  // Decode or fetch role from token
  const role = token ? JSON.parse(token).role : null;

  const { pathname } = req.nextUrl;

  // If trying to access employer dashboard, but the user is a freelancer
  if (pathname.startsWith('/dashboard/employer') && role !== 'employer') {
    return NextResponse.redirect(new URL('/dashboard/freelancer', req.url));
  }

  // If trying to access freelancer dashboard, but the user is an employer
  if (pathname.startsWith('/dashboard/freelancer') && role !== 'freelancer') {
    return NextResponse.redirect(new URL('/dashboard/employer', req.url));
  }

  // Allow access if everything is fine
  return NextResponse.next();
}

// Define the paths where this middleware should be applied
export const config = {
  matcher: ['/dashboard/:path*'], // Apply the middleware to all dashboard routes
};
