import type { FamilyMember } from "@/pure/tree.types";
import { ShowIf } from "./ShowIf";
import { useEffect, useState } from "react";
import styles from "../css/treeNode.module.css";
import {
  useAddFamilyMember,
  useDomUpdateStore,
  useVirtualizationStore,
} from "@/state/store.zustand";
import { DEFAULT_VIRTUALIZATION_STATE } from "@/pure/defaults.constants";
import { useOffspringData } from "@/hooks/useOffspringData";

export const TreeNode = ({
  name,
  id,
  birthday,
  deathDay,
  childrenCount,
  parentsQueryId,
  generation,
}: FamilyMember & { generation: number; parentsQueryId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  /* Retrive virtualization state functions */
  const { initializeVirtualizationState, toggleIsOpen } =
    useVirtualizationStore((store) => store.actions);

  /* Retrieve virtualization state for family-tree node */
  const state = useVirtualizationStore((store) => store.state[id]);
  const {
    childrenQueryId,
    isVisible: isVirtualizationVisible,
    isOpen: isVisualizationOpen,
  } = state || DEFAULT_VIRTUALIZATION_STATE;

  useEffect(() => {
    setIsOpen(isVisualizationOpen);
    setIsVisible(isVirtualizationVisible);
  }, [isVisualizationOpen, isVirtualizationVisible]);

  /* Register virtualization state if not present */
  useEffect(() => {
    if (!state) {
      initializeVirtualizationState(id);
    }
  }, [initializeVirtualizationState, id]);

  /* Lazy-load children, cache results, explicitly call out loading and error states */
  const {
    familyMembersChildren,
    isLoadingChildren,
    isErrorLoadingChildren,
    error,
  } = useOffspringData({
    familyMemberId: id,
    childrenCount,
    childrenQueryId,
    isFamilyMemberExpanded: isOpen,
  });

  /* Register relevant dom changes to top to root-stock (ie, top of family tree) */
  const setDomUpdateId = useDomUpdateStore((state) => state.setDomUpdateId);
  useEffect(() => {
    if (familyMembersChildren.length || !isVisible) {
      setDomUpdateId(`${new Date().getUTCDate()}_${id}`);
    }
  }, [familyMembersChildren.length, isVisible, isOpen]);

  /* Add Family Member */
  const setAddFamilyMember = useAddFamilyMember((s) => s.setAddFamilyMember);

  const colors = ["single", "second", "third"];
  const buttonStyles = colors[generation % 3];

  return (
    <div
      data-id={id}
      className="tree-node"
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "10px 0 10px 45px",
        borderRadius: "0",
        margin: "5px",
        marginLeft: `${20 * generation}px`,
      }}
    >
      <ShowIf
        condition={isVisible}
        show={
          <>
            <h1 onClick={() => toggleIsOpen(id)} className={styles.title}>
              <text>
                {isOpen ? "▼" : "▶"} {name}
              </text>

              <button className={styles[`edit-${buttonStyles}`]}>Edit</button>
            </h1>

            <ShowIf
              condition={isOpen}
              show={
                <div className={styles.container}>
                  <br />
                  Birth: {birthday} <br />
                  <ShowIf
                    condition={!!deathDay}
                    show={
                      <>
                        Death: {deathDay} <br />
                      </>
                    }
                  />
                  Children: {childrenCount} <br />
                  <button
                    className={styles[`add-child-${buttonStyles}`]}
                    onClick={() => {
                      setAddFamilyMember(id, name, childrenQueryId);
                    }}
                  >
                    Add Family Member
                  </button>
                  <ShowIf
                    condition={isLoadingChildren && childrenCount > 0}
                    show={<p> Loading Children... </p>}
                  />
                  <ShowIf
                    condition={isErrorLoadingChildren}
                    show={<p>Error loading children: {error?.message}</p>}
                  />
                  <ShowIf
                    condition={!!familyMembersChildren.length}
                    show={familyMembersChildren.map((child) => (
                      <TreeNode
                        key={child.id}
                        {...child}
                        generation={generation + 1}
                        parentsQueryId={childrenQueryId}
                      />
                    ))}
                  />
                </div>
              }
            />
          </>
        }
      />
    </div>
  );
};
