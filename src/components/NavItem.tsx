// https://codewithmarish.com/post/how-to-create-responsive-navbar-in-next-js

import Link from "next/link";
import React from "react";

type Props = {
    text: string
    href: string
    active?: boolean
}

const NavItem:React.FC<Props> = ({ text, href, active}: Props) => {
  return (
    <Link legacyBehavior href={href}>
      <a
        className={`nav__item ${
          active ? "active" : ""
        }`}
      >
        {text}
      </a>
    </Link>
  );
};

export default NavItem;