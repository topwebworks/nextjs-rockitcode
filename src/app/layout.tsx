import { clsx } from "clsx";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import type React from "react";
import { RockitSessionProvider } from '@/components/rockitcode/session-provider'
import { EditorSettingsProvider } from '@/contexts/editor-settings'
import { LearningProvider } from '@/contexts/learning-context'
import { UserProvider } from '@/contexts/UserContext'
import { MainSiteLayout } from '@/components/main-site-layout'
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
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body 
        className="bg-white dark:bg-gray-950 text-gray-950 dark:text-white"
        suppressHydrationWarning={true}
      >
        <RockitSessionProvider>
          <EditorSettingsProvider>
            <LearningProvider>
              <UserProvider>
                {children}
              </UserProvider>
            </LearningProvider>
          </EditorSettingsProvider>
        </RockitSessionProvider>
      </body>
    </html>
  );
}
