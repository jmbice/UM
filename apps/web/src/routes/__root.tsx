import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import styles from "../css/app.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        title: "Family Tree",
      },
    ],
  }),
  wrapInSuspense: true,

  component: () => (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <div className={styles.viewTransitionGroup}>
          <Outlet />
        </div>
      </QueryClientProvider>
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
