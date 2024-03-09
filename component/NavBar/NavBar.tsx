import { MenuType } from "@/types/Menu/menu";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import React from "react";

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  menuList: MenuType[];
}

const NavBar = React.forwardRef(
  (
    { menuList, className, ...props }: NavBarProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <nav id="navbar" ref={ref} className={className} {...props}>
        <Menu>
          {menuList.map((menu: MenuType, _: number) => {
            return (
              <MenuItem
                key={menu.seq}
                menu={menu}
                style={{
                  width: "auto",
                }}
              />
            );
          })}
        </Menu>
      </nav>
    );
  }
);
NavBar.displayName = "NavBar";
export default NavBar;
