import { MenuType } from "@/types/Menu/menu";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import React from "react";

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
  menuList: MenuType[];
  setIsHeaderDisplay: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const NavBar = React.forwardRef(
  (
    {
      menuList,
      setIsHeaderDisplay,
      isMobile,
      className,
      ...props
    }: NavBarProps,
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
                setIsHeaderDisplay={setIsHeaderDisplay}
                isMobile={isMobile}
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
