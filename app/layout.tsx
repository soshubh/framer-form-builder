import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WHIM",
  description: "Build and export production-ready Framer forms with live preview and code generation.",
  icons: {
    icon: "/brand/FBFLogo.png",
    shortcut: "/brand/FBFLogo.png",
    apple: "/brand/FBFLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
