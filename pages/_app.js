import "../styles/globals.css";
import React from "react";
import { CookiesProvider } from "react-cookie";
import Link from "next/link";
import Navbar from "components/UI/Navbar";
import Logout from "components/Logout";

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-no-repeat bg-cover bg-fixed bg-login">
        <Navbar>
          <Link href="/diagnostic">Get a diagnostic</Link>
          <Link href="/history">Diagnostic history</Link>
          <Logout />
        </Navbar>
      </div>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}
