import { useFamilyMemberData } from "@/hooks/useFamilyTreeData";
import type { FamilyMember } from "@/pure/tree.types";
import { ShowIf } from "./ShowIf";
import { useEffect, useState } from "react";
import {
  useDomUpdateStore,
  useVirtualizationStore,
} from "@/state/store.zustand";
import { DEFAULT_VIRTUALIZATION_STATE } from "@/pure/defaults.constants";

export const TreeNode = ({
  name,
  id,
  birthday,
  deathDay,
  childrenCount,
  generation,
}: FamilyMember & { generation: number }) => {
  /* Retrive virtualization state functions */
  const { initializeVirtualizationState, toggleIsOpen } =
    useVirtualizationStore((store) => store.actions);

  /* Retrieve virtualization state for family-tree node */
  const state = useVirtualizationStore((store) => store.state[id]);
  const { isVisible, childrenQueryId, isOpen } =
    state || DEFAULT_VIRTUALIZATION_STATE;

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
  } = useFamilyMemberData({
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
  }, [familyMembersChildren.length, isVisible]);

  return (
    <div
      data-id={id}
      className="tree-node"
      style={{
        border: "1px solid white",
        padding: "5px",
        borderRadius: "5px",
        marginLeft: `${20 * generation}px`,
      }}
    >
      isVisible:{isVisible.toString()}
      name: {name}
      <ShowIf
        condition={isVisible}
        show={
          <>
            <p>{name} </p>
            <button onClick={() => toggleIsOpen(id)}>
              {isOpen ? "▼" : "▶"}
            </button>

            <ShowIf
              condition={isOpen}
              show={
                <div>
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
