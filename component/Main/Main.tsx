"use client";
import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Main.module.scss";

export default function Main({ children }: any) {
  const [isHeaderDisplay, setIsHeaderDisplay] = useState<boolean>(true);

  return (
    <>
      <Header
        isHeaderDisplay={isHeaderDisplay}
        setIsHeaderDisplay={setIsHeaderDisplay}
      />
      <div className={`${styles.main_wrap}`}>
        <div
          className={`${styles.section_top} ${
            isHeaderDisplay ? styles.open : styles.close
          }`}
        >
          {children}
        </div>
        <div
          className={`${styles.section_bottom}  ${
            isHeaderDisplay ? styles.open : styles.close
          }`}
        >
          <Footer />
        </div>
      </div>
    </>
  );
}
