import { createFileRoute, Link } from "@tanstack/react-router";
import guitars from "@/guitars";
import styles from "../css/index.module.css";

export const Route = createFileRoute("/")({
  component: App,
});

export default function App() {
  return (
    <>
      <h1 className={styles.app_heading_text}>Featured Guitars</h1>
      <div className={styles.app_flex_container}>
        {guitars.map((guitar) => (
          <div key={guitar.id} className={styles.app_card}>
            <Link
              to="/guitar/$guitarId"
              params={{
                guitarId: guitar.id.toString(),
              }}
            >
              <div className={styles.app_image_container}>
                <div className={styles.app_image_wrapper}>
                  <img
                    src={guitar.image}
                    alt={guitar.name}
                    className={styles.guitar_image}
                    style={{
                      viewTransitionName: `guitar-${guitar.id}`,
                    }}
                  />
                  <div className={styles.app_gradient_overlay}></div>
                </div>

                <div className={styles.app_view_details}>View Details</div>
              </div>

              <div className={styles.app_info_box}>
                <h2 className={styles.app_title}>{guitar.name}</h2>
                <p className={styles.app_description}>
                  {guitar.shortDescription}
                </p>
                <div className={styles.app_price}>${guitar.price}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
