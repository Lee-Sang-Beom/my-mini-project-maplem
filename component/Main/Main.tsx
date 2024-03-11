"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Main.module.scss";
import { useDimensions } from "@chakra-ui/react";

export default function Main({ children }: any) {
  const [isHeaderDisplay, setIsHeaderDisplay] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const elementRef = useRef<any>(null);
  const dimensions = useDimensions(elementRef);

  useEffect(() => {
    if (dimensions && dimensions.borderBox.width > 640) {
      setIsHeaderDisplay(true);
      setIsMobile(false);
    } else {
      setIsHeaderDisplay(false);
      setIsMobile(true);
    }
  }, [dimensions]);
  return (
    <div style={{ width: "100%" }} ref={elementRef}>
      <Header
        isHeaderDisplay={isHeaderDisplay}
        setIsHeaderDisplay={setIsHeaderDisplay}
        isMobile={isMobile}
      />
      <div className={`${styles.main_wrap}`}>
        <div
          className={`${styles.section_top} ${
            isHeaderDisplay ? styles.open : styles.close
          } ${isMobile && styles.mobile_screen}`}
        >
          {children}
        </div>
        <div
          className={`${styles.section_bottom}  ${
            isHeaderDisplay ? styles.open : styles.close
          } ${isMobile && styles.mobile_screen}`}
        >
          <Footer />
        </div>
      </div>
    </div>
  );
}
