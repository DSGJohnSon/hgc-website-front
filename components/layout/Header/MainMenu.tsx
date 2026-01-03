"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MenuItemData } from "@/types";
import { LuChevronDown, LuGamepad } from "react-icons/lu";

interface MainMenuProps {
  menuItems: MenuItemData[];
}

const MainMenu: React.FC<MainMenuProps> = ({ menuItems }) => {
  return (
    <nav className="hidden lg:inline-block ml-0 xl:ml-[140px]">
      <ul className="m-0 p-0">
        {menuItems.map((item) => (
          <MenuItem key={item.label} item={item} />
        ))}
      </ul>
    </nav>
  );
};

interface MenuItemProps {
  item: MenuItemData;
  isSubmenu?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isSubmenu = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <li
      className={`
        inline-block relative list-none
        ${!isSubmenu ? "mx-[27px] first:ml-0 last:mr-0" : "block mx-0 px-[9px]"}
        ${hasSubmenu ? "group" : ""}
      `}
      onMouseEnter={() => hasSubmenu && setIsOpen(true)}
      onMouseLeave={() => hasSubmenu && setIsOpen(false)}
    >
      <Link
        href={item.href}
        className={`
          relative font-rajdhani font-semibold text-white
          flex items-center
          group/gamepad
          transition-colors duration-300
          ${!isSubmenu ? "text-base p-[8px] xl:p-[16px]" : "text-base capitalize"}
          hover:text-theme
        `}
      >
        {isSubmenu && (
          <LuGamepad
            className="
              text-theme opacity-0 group-hover/gamepad:opacity-100
              translate-x-[-20px] group-hover/gamepad:translate-x-[-5px]
              transition-all duration-300
            "
          />
        )}
        <span>{item.label}</span>
        {hasSubmenu && !isSubmenu && (
          <LuChevronDown className="ml-3 transition-transform duration-300 group-hover:rotate-180" />
        )}
        {hasSubmenu && isSubmenu && (
          <span className="float-right text-sm text-gray-400">▶</span>
        )}
      </Link>

      {hasSubmenu && (
        <ul
          className={`
            absolute text-left min-w-[230px] w-max
            bg-linear-to-t from-black to-gray-950
            transition-all duration-400 origin-top
            border-theme border-l-3
            flex flex-col
            ${
              !isSubmenu
                ? "top-[calc(100%)] left-0 p-4 "
                : "top-0 left-full ml-5 pt-[18px] pb-[18px] px-[20px] pl-[18px]"
            }
            ${
              isOpen
                ? "opacity-100 visible scale-y-100 z-50"
                : "opacity-0 invisible scale-y-0 -z-10"
            }
          `}
        >
          {item.submenu?.map((subItem) => (
            <MenuItem key={subItem.label} item={subItem} isSubmenu />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MainMenu;
