import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

// Font files can be colocated inside of `app`
const inter = localFont({
  src: '../public/fonts/Inter-Variable.woff2', // Updated path to WOFF2 file
  display: 'swap',
  variable: '--font-inter' // Optional: if you use CSS variables
});

export const metadata: Metadata = {
  title: 'Photo Calendar',
  description: 'Organize your photos in a beautiful calendar interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}> {/* Use variable if defined */}
        {/* Or fallback to className if not using CSS variables: <body className={inter.className}> */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}