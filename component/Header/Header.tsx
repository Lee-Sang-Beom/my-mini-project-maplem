import styles from "./Header.module.scss";
import React from "react";
import Link from "next/link";
import Avatar from "../common/Avatar/Avatar";
import NavBar from "../NavBar/NavBar";
import { MenuType } from "@/types/Menu/menu";

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  /**
   * @avatarStyle : 로고 이미지에 필요한 스타일 부여
   */
  const avatarStyle: React.CSSProperties = {
    borderRadius: "0",
    width: "100px",
    height: "100%",
    objectFit: "cover",
  };

  /**
   * @menuList :  NavBar의 메뉴 출력에 필요한 메뉴 정보
   */
  const menuList: MenuType[] = [
    {
      seq: 1,
      name: "검색",
      href: "/menu/search",
    },
    {
      seq: 2,
      name: "일정",
      href: "/menu/schedule",
    },
    {
      seq: 3,
      name: "공지사항",
      href: "/menu/notice",
    },
  ];

  return (
    <div
      id="header"
      ref={ref}
      className={`${styles.header_top} ${className}`}
      {...props}
    >
      <div className={styles.header_left}>
        <Link href="/">
          <Avatar
            alt="블로그 B팀"
            src="/img/logo.png"
            style={avatarStyle}
            className={"avatar_className"}
          />
        </Link>
      </div>

      <div className={styles.header_center}>
        <NavBar menuList={menuList} />
      </div>
    </div>
  );
});
Header.displayName = "Header";
export default Header;
