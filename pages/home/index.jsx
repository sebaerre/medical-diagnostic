import React from "react";
import { parseCookies } from "helpers";

export default function Home() {
  return <div>Home</div>;
}

Home.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);
  if (res) {
    if (!data.user) {
      res.writeHead(301, { Location: "/login" });
      res.end();
    }
  }

  return {
    data: data,
  };
};
