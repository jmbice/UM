import { useEffect, useRef } from "react";
import { TreeNode } from "./TreeNode";
import { useEarliestAncestor } from "@/hooks/useFamilyTreeData";
import type { FamilyMember } from "@/pure/tree.types";
import { ShowIf } from "./ShowIf";
import {
  useDomUpdateStore,
  useVirtualizationStore,
} from "../state/store.zustand";

export const RootStock = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const domUpdateId = useDomUpdateStore((state) => state.domUpdateId);
  const { setIsVisible } = useVirtualizationStore((store) => store.actions);

  // because we need to dismount components out of view to not overload the dom
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(({ target, isIntersecting }) => {
      const id = (target as HTMLElement).getAttribute("data-id") || "";
      if (id) {
        console.log({
          action: `${isIntersecting ? "Make Visible" : "Remove From View"}`,
          id,
        });
        setIsVisible(id, isIntersecting);
      }
    });
  };

  // because we need to establish a boundry for mounting and unmounting dom components
  useEffect(() => {
    if (containerRef?.current) {
      const observer = new IntersectionObserver(observerCallback, {
        root: containerRef.current,
        rootMargin: "100px", // how far off the screen we consider to be "intersecting"
      });

      const treeNodes = containerRef.current.querySelectorAll(".tree-node");
      treeNodes.forEach((node) => observer.observe(node));

      return () => observer.disconnect();
    }
  }, [domUpdateId]);

  const {
    earliestAncestor,
    isLoadingEarliestAncestor,
    isErrorLoadingEarliestAncestor,
    error,
  } = useEarliestAncestor();

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "scroll",
        border: "1px solid fuchsia  ",
        borderRadius: "5px",
      }}
    >
      <ShowIf
        condition={isLoadingEarliestAncestor}
        show={<p>...Loading Earliest Ancestor</p>}
      />
      <ShowIf
        condition={isErrorLoadingEarliestAncestor}
        show={<p>Error loading children: {error?.message}</p>}
      />
      <ShowIf
        condition={!!earliestAncestor}
        show={
          // <p>OK</p>
          <TreeNode {...(earliestAncestor as FamilyMember)} generation={1} />
        }
      />
    </div>
  );
};
