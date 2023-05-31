import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../../lib/FirebaseConfig";
import NavItem from "./NavItem";

const MENU_LIST = [
  { text: "About Us", href: "/about" },
  { text: "Help", href: "/contact" },
];

const Navbar = () => {
  const router = useRouter();
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <header>
      <nav className={`nav`}>
        <Link href={"/"} passHref>
          <div className="d-flex align-items-center">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5ce457b010282600010135f2/1559082496575-KJS85T7I91BXO784LNZL/58847423_2006391886337279_1749835535418916864_n.png"
              style={{ float: "left", marginRight: "10px", maxWidth: "10%" }}
            />
            <h1 className="logo" style={{ fontSize: "20px" }}>
              BIG Safety Training Database
            </h1>
          </div>
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              <NavItem active={activeIdx === idx} {...menu} />
            </div>
          ))}
          {isLoggedIn ? (
            <div onClick={handleLogout}>
              <NavItem active={false} text="Logout" href="/" />
            </div>
          ) : (
            <div onClick={() => router.push("/signin")}>
              <NavItem active={false} text="Sign In" href="/signin" />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
