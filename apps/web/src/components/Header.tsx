import { Link } from "@tanstack/react-router";
import styles from "../css/header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.header_flex}>
          <div className={styles.header_responsive}>
            <div className={styles.header_column}>
              <div className={styles.header_responsive_text}>Cascade Tone</div>
              <p className={styles.header_text_subtitle}>
                Premium Handcrafted Guitars
              </p>
            </div>
          </div>
        </div>

        <div className={styles.header_image_container}>
          <div className={styles.header_image_inner}>
            <div className={styles.header_image_blur}></div>
            <img
              src="/logo.png"
              alt="Cascade Tone Logo"
              className={styles.header_image}
            />
          </div>
        </div>
      </Link>
    </header>
  );
}
