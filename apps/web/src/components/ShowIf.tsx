import type { ReactNode } from "@tanstack/react-router";

export const ShowIf = ({
  condition,
  show,
}: {
  condition: boolean;
  show: ReactNode;
}) => {
  return condition ? show : null;
};
