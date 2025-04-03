import { createFileRoute, Link } from "@tanstack/react-router";
import guitars from "@/guitars";
import styles from "../css/index.module.css";
import { RootStock } from "@/components/RootStock";

export const Route = createFileRoute("/")({
  component: App,
});

export default function App() {
  return (
    <>
      <h1 className={styles.app_heading_text}>Family Tree</h1>
      <div className={styles.app_flex_container}>
        <RootStock />
      </div>
    </>
  );
}
