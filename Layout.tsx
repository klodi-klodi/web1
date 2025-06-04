import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import React from "react";
import Footer from "./Footer";
import SocialMediaBar from "./SocialMediaBar";
import ContactBar from "./ContactBar";
const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SocialMediaBar />
      <ContactBar />
    </>
  );
};

export default Layout;
