"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import React from "react";
import { MenuType } from "@/types/Menu/menu";
import styles from "./Menu.module.scss";

interface ExtendLIProps extends React.HTMLAttributes<HTMLLIElement> {
  menu: MenuType;
}

const MenuItem = React.forwardRef(
  (
    { menu, className, ...props }: ExtendLIProps,
    ref: React.Ref<HTMLLIElement>
  ) => {
    const currentPathName = usePathname();

    const [onHover, setOnHover] = useState<boolean>(false);
    const isCurrentVisit = currentPathName === menu.href;

    return (
      <li
        role="tablist"
        className={`${styles.tablist} ${className}`}
        ref={ref}
        {...props}
      >
        <Link
          href={menu.href}
          prefetch={false}
          target={menu.target ? "_blank" : "_self"}
        >
          <button
            title="메뉴 이동"
            className={styles.tab_button}
            onMouseEnter={() => {
              setOnHover(true);
            }}
            onMouseLeave={() => {
              setOnHover(false);
            }}
            tabIndex={-1}
          >
            <p
              className={`${isCurrentVisit && styles.equal_url_tab_text} ${
                onHover
                  ? styles.hover_active_tab_text
                  : styles.hover_unactive_tab_text
              }`}
            >
              {menu.name}
            </p>
            <p
              className={`${
                isCurrentVisit && styles.equal_url_tab_bottom_box
              } ${onHover ? styles.hover_tab_bottom_box : ""}`}
            ></p>
          </button>
        </Link>
      </li>
    );
  }
);
MenuItem.displayName = "MenuItem";
export default MenuItem;
