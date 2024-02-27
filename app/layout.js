import React from 'react'
import "./globals.css";
import { StateProvider } from '@/context/Context'
import ThemeRegistry from "@/utils/ThemeRegistry";
import { SpeedInsights } from '@vercel/speed-insights/next';
import ComingSoon from '@/components/comingSoon/page';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: "ChicCRM",
  description: "Generated by create next app",
};

export default function RootLayout({ children, isComingSoon }) {
  return (
    <html lang="en">
      <ThemeRegistry options={{ key: 'mui-theme' }}>
        {/* <body className={isComingSoon ? 'coming-soon' : ''}>
          <header></header>
          <StateProvider>
            {children}
            <SpeedInsights />
          </StateProvider>
          <footer></footer>
        </body> */}
        <body>
        <GoogleOAuthProvider clientId="1089445122074-oktnkasmvnhrcq1bahdv2im3ua1msiqo.apps.googleusercontent.com">
          <div className= 'sm:block lg:hidden m-0 p-0'>
            <ComingSoon />
          </div>
          <div >
            <header></header>
            <StateProvider>
              {children}
              <SpeedInsights />
            </StateProvider>
            <footer></footer>
          </div>
          </GoogleOAuthProvider>
        </body>
      </ThemeRegistry>
    </html>
  );
}