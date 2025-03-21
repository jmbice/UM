import { createFileRoute, Link } from "@tanstack/react-router";
import guitars from "@/guitars";
import styles from "../../css/product.module.css";

export const Route = createFileRoute("/guitar/$guitarId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const guitar = guitars.find((guitar) => guitar.id === +params.guitarId);
    if (!guitar) {
      throw new Error("Guitar not found");
    }
    return guitar;
  },
});

function RouteComponent() {
  const guitar = Route.useLoaderData();

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        style={{
          viewTransitionName: "description",
        }}
      >
        <Link to="/" className={styles.backLink}>
          &larr; Back to all guitars
        </Link>
        <h1 className={styles.title}>{guitar.name}</h1>
        <p className={styles.description}>{guitar.description}</p>
        <div className={styles.priceContainer}>
          <div className={styles.price}>${guitar.price}</div>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img
            src={guitar.image}
            alt={guitar.name}
            className={styles.guitarImage}
            style={{
              viewTransitionName: `guitar-${guitar.id}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
