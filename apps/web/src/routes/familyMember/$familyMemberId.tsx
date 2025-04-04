import { createFileRoute, Link } from "@tanstack/react-router";
import styles from "../../css/product.module.css";
import type { FamilyMember } from "@/pure/tree.types";

export const Route = createFileRoute("/familyMember/$familyMemberId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const familyMember = (() => {})() as any; // TODO
    if (!familyMember) {
      throw new Error("Family Member not found");
    }
    return familyMember;
  },
});

function RouteComponent() {
  const familyMember = Route.useLoaderData() as FamilyMember;

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        style={{
          viewTransitionName: "description",
        }}
      >
        <Link to="/" className={styles.backLink}>
          &larr; Back to family tree
        </Link>
        <h1 className={styles.title}>{familyMember.name}</h1>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          {/* <img
            src={familyMember.image}
            alt={familyMember.name}
            className={styles.familyMemberImage}
            style={{
              viewTransitionName: `guitar-${familyMember.id}`,
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
