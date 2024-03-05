export function middleware(request) {
    const currentUser = request.cookies.get('token')?.value
   
    if (currentUser && !request.nextUrl.pathname.startsWith('/Workspace') && !request.nextUrl.pathname.startsWith('/RequestList') && !request.nextUrl.pathname.startsWith('/RequestLisU')
    && !request.nextUrl.pathname.startsWith('/ShareDocument')&& !request.nextUrl.pathname.startsWith('/Userlist')
    )  {
        return Response.redirect(new URL('/Workspace', request.url));
    }
  
   
    if (!currentUser && !request.nextUrl.pathname.startsWith('/Login') && !request.nextUrl.pathname.startsWith('/Register') && !request.nextUrl.pathname.startsWith('/Selectcompany')
    && !request.nextUrl.pathname.startsWith('/ForgotPassword') && !request.nextUrl.pathname.startsWith('/CreateCompany')&& !request.nextUrl.pathname.startsWith('/Mfa')
    && !request.nextUrl.pathname.startsWith('/ResetPassSuccess')&& !request.nextUrl.pathname.startsWith('/ResetPassword') && !request.nextUrl.pathname.startsWith('/ResetSuccess')
    && !request.nextUrl.pathname.startsWith('/OTPverify')&& !request.nextUrl.pathname.startsWith('/test') && !request.nextUrl.pathname.startsWith('/Authenticator') && !request.nextUrl.pathname.startsWith('/Authenverify')
    && !request.nextUrl.pathname.startsWith('/Changepassword')
    ) {
      return Response.redirect(new URL('/Login', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}