import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

export const metadata = {
    title: "Enigma",
    description: "Web bói toán lừa bịp",
};

export default function RootLayout({ children }) {
    return (<html lang="en">
        <body>
              {children}
        </body>
    </html>);
};


