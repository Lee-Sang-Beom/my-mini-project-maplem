"use client";

import styles from "./Header.module.scss";
import React, { useState } from "react";
import Link from "next/link";
import Avatar from "../common/Avatar/Avatar";
import NavBar from "../NavBar/NavBar";
import { MenuType } from "@/types/Menu/menu";
import { RiLoginBoxLine } from "react-icons/ri";
import { Button } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaCanadianMapleLeaf } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineEventNote } from "react-icons/md";

const Header = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  /**
   * @avatarStyle : 로고 이미지에 필요한 스타일 부여
   */
  const avatarStyle: React.CSSProperties = {
    borderRadius: "16px",
    width: "150px",
    height: "100px",
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
      target: false,
    },
    {
      seq: 2,
      name: "일정",
      href: "/menu/schedule",
      target: false,
    },
    {
      seq: 3,
      name: "공지사항",
      href: "/menu/notice",
      target: false,
    },
    {
      seq: 4,
      name: "공식 커뮤니티",
      href: "https://forum.nexon.com/maplestorym/main",
      target: true,
    },
  ];

  const [isHeaderDisplay, setIsHeaderDisplay] = useState<boolean>(true);

  return (
    <>
      {/* 헤더는 펼쳤을 때 200px를, 닫혔을 때 30px 영역을 차지한다. */}
      <div
        id="header"
        ref={ref}
        className={`${styles.header} ${className} ${
          !isHeaderDisplay && styles.non_visible
        }`}
        {...props}
      >
        {isHeaderDisplay ? (
          <>
            <div className={styles.header_left}>
              {/* 닫기 버튼 */}
              <button
                className={`${styles.close_btn_box}`}
                title="닫기버튼"
                onClick={() => {
                  setIsHeaderDisplay(false);
                }}
              >
                <IoMdClose size={20} role="img" aria-label="메뉴 닫기 아이콘" />
              </button>

              {/* 로고 */}
              <Link href="/" title="홈으로">
                <Avatar
                  alt="메이플스토리M 메인 로고"
                  src="/img/logo.png"
                  style={avatarStyle}
                  className={"avatar_className"}
                />
              </Link>
            </div>

            <div className={styles.header_center}>
              {/* 메뉴 */}
              <NavBar menuList={menuList} />
            </div>

            <div className={styles.header_right}>
              {/* 로그인 */}
              <Button
                leftIcon={
                  <RiLoginBoxLine
                    size={16}
                    role="img"
                    aria-label="로그인 아이콘"
                  />
                }
                colorScheme="twitter"
              >
                로그인
              </Button>
            </div>
          </>
        ) : (
          <div className={`${styles.mobile_header_btn_box}`}>
            <button
              className={styles.open_btn}
              title="열기버튼"
              onClick={() => {
                setIsHeaderDisplay(true);
              }}
            >
              <RxHamburgerMenu
                size={20}
                role="img"
                aria-label="메뉴 열기 아이콘"
              />
            </button>

            {/* 검색 */}
            <Link href="/menu/search">
              <IoSearch size={20} role="img" aria-label="검색 아이콘" />
            </Link>
            {/* 일정 */}
            <Link href="/menu/schedule">
              <CiCalendar size={20} role="img" aria-label="일정 아이콘" />
            </Link>
            {/* 공지사항 */}
            <Link href="/menu/notice">
              <MdOutlineEventNote
                size={20}
                role="img"
                aria-label="공지사항 아이콘"
              />
            </Link>
            {/* 공식 홈페이지 */}
            <Link
              href="https://forum.nexon.com/maplestorym/main"
              target="_blank"
            >
              <FaCanadianMapleLeaf size={20} role="img" aria-label="단풍잎" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
});
Header.displayName = "Header";
export default Header;
