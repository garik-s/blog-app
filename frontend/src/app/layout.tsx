import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog posts",
  description: "Simple educational app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
