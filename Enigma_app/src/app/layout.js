import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Enigma",
  description: "Web Tarot kết nối reader và khách hàng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
