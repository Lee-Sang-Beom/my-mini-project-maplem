import Footer from "../Footer/Footer";
import styles from "./Main.module.scss";

export default function Main({ children }: any) {
  return (
    <div className={styles.main_wrap}>
      <div className={styles.section_top}>{children}</div>
      <div className={styles.section_bottom}>
        <Footer />
      </div>
    </div>
  );
}
