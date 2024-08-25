import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
const privatePaths = ['/manage', '/orders']
const authPaths = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value

  if(privatePaths.some((path) => pathname.startsWith(path) && !accessToken)){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if(authPaths.some((path) => pathname.startsWith(path) && accessToken)){
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: ['/login', '/orders', '/manage/:path*'],
}