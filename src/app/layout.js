import { Inter } from "next/font/google";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
const monts = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "SwiftShip - The Campus Food Ordering App",
  description: "Order Food from anywhere on campus",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={monts.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
