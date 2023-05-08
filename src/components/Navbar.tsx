// https://codewithmarish.com/post/how-to-create-responsive-navbar-in-next-js

import Link from "next/link";
import React, { useState } from "react";
import NavItem from "./NavItem";
// import "./Navbar.css";

const MENU_LIST = [
  { text: "Sign In", href: "/" },
  { text: "About Us", href: "/about" },
  { text: "Help", href: "/contact" },
];

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  return (
    <header>
      <nav className={`nav`}>
        <Link legacyBehavior href={"/"}>
          <a>
            <h1 className="logo">BIG Safety Training Database</h1>
          </a>
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;