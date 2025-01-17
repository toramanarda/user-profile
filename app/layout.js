import { Lexend } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const lexend = Lexend({ weight: ["500", "300"], subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lexend.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
