import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "@/components/organisms/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inec Press",
  description: "Inec Press",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ToastContainer position="top-center" />
          {children}
        </Provider>
      </body>
    </html>
  );
}
