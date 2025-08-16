import "./globals.css";
import SideNav from '../components/SideNav'
import TopNav from "@/components/TopNav";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        <SideNav/>

        <div className="w-full">
          {/* <TopNav/> */}
        {children}
        </div>
        </body>
    </html>
  );
}
