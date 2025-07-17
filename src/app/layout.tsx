import { clsx } from "clsx";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import type React from "react";
import { GlobalHeader } from '@/components/simple-header'
import CommunityFooter from '@/components/community-footer'
import { UserProvider } from '@/contexts/UserContext'
import "./globals.css";

const InterVariable = localFont({
  variable: "--font-inter",
  src: [
    { path: "./InterVariable.woff2", style: "normal" },
    { path: "./InterVariable-Italic.woff2", style: "italic" },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        GeistMono.variable,
        InterVariable.variable,
        "scroll-pt-16 font-sans antialiased dark:bg-gray-950",
      )}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Always enable dark mode
                document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
      </head>
      <body 
        className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
        suppressHydrationWarning={true}
      >
        <UserProvider>
          <GlobalHeader />
          <main className="min-h-screen">
            {children}
          </main>
          <CommunityFooter />
        </UserProvider>
      </body>
    </html>
  );
}
