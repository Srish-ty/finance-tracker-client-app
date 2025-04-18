import "./globals.css";
import Navbar from "./components/marginals/Navbar";

export const metadata = {
  title: "Personal Finance Visualizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
