import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Moses Fernando | Full Stack Developer",
  description: "Portfolio of Moses Fernando (mosesfdo), a Full Stack Developer crafting clean automation tools, React applications, and python utilities.",
  keywords: ["Moses Fernando", "mosesfdo", "Developer Portfolio", "Full Stack Developer", "Next.js", "React", "Python", "TuneGrab", "TempMail"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full dark"
    >
      <body className="min-h-full bg-black text-white font-sans antialiased overflow-x-hidden">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}


