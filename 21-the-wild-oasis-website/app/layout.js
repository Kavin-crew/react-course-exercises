import Logo from "@/app/components/Logo";
import Navigation from "@/app/components/Navigation";

export const metadata = {
  title: "The wild oasis",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
