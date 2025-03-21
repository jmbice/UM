import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { MantineProvider } from "@mantine/core";
import Header from "../components/Header";
import styles from "../css/app.module.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Guitar Store",
      },
    ],
  }),
  wrapInSuspense: true,

  component: () => (
    <RootDocument>
      <MantineProvider defaultColorScheme="dark">
        <Header />
        <div className={styles.viewTransitionGroup}>
          <Outlet />
        </div>
      </MantineProvider>
    </RootDocument>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className={styles.container}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
