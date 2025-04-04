import { createFileRoute } from "@tanstack/react-router";
import styles from "../css/index.module.css";
import { RootStock } from "@/components/RootStock";
import { z } from "zod";
import { AddFamilyMemberModal } from "@/components/AddFamilyModal";

export const Route = createFileRoute("/")({
  component: App,
  validateSearch: z.object({
    rootId: z.string(),
  }),
});

export default function App() {
  return (
    <>
      <div className={styles.app_flex_container}>
        <RootStock />
        <AddFamilyMemberModal />
      </div>
    </>
  );
}
