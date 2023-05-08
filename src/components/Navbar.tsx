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
    // <header>
    //   <nav className={`nav`}>
    //     <Link legacyBehavior href={"/"}>
    //       <a>
    //         <img
    //           src="https://images.squarespace-cdn.com/content/v1/5ce457b010282600010135f2/1559082496575-KJS85T7I91BXO784LNZL/58847423_2006391886337279_1749835535418916864_n.png"
    //           style={{ float: "left", marginRight: "10px", maxWidth: "100%" }}
    //         />
    //         <h1 className="logo">BIG Safety Training Database</h1>
    //       </a>
    //     </Link>
    //     <div
    //       onClick={() => setNavActive(!navActive)}
    //       className={`nav__menu-bar`}
    //     >
    //       <div></div>
    //       <div></div>
    //       <div></div>
    //     </div>
    //     <div className={`${navActive ? "active" : ""} nav__menu-list`}>
    //       {MENU_LIST.map((menu, idx) => (
    //         <div
    //           onClick={() => {
    //             setActiveIdx(idx);
    //             setNavActive(false);
    //           }}
    //           key={menu.text}
    //         >
    //           <NavItem active={activeIdx === idx} {...menu} />
    //         </div>
    //       ))}
    //     </div>
    //   </nav>
    // </header>
    <header>
      <nav className={`nav`}>
        <Link legacyBehavior href={"/"}>
          <a>
            <div className="d-flex align-items-center">
              <img
                src="https://images.squarespace-cdn.com/content/v1/5ce457b010282600010135f2/1559082496575-KJS85T7I91BXO784LNZL/58847423_2006391886337279_1749835535418916864_n.png"
                style={{ float: "left", marginRight: "10px", maxWidth: "10%" }}
              />
              <h1 className="logo" style={{ fontSize: "20px" }}>
                BIG Safety Training Database
              </h1>
            </div>
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
