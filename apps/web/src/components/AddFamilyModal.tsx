import React, { useEffect, useReducer, useState } from "react";
import styles from "../css/modal.module.css";
import { ShowIf } from "./ShowIf";
import { createFamilyMember } from "@/pure/familyMember.factory";
import { useMutateFamilyMember } from "@/hooks/useAddFamilyMember";
import type { FamilyMember } from "@/pure/tree.types";
import { useAddFamilyMember } from "@/state/store.zustand";

export const AddFamilyMemberModal = () => {
  const { addFamilyMember } = useMutateFamilyMember();
  const parentId = useAddFamilyMember((s) => s.parentId);
  const parentName = useAddFamilyMember((s) => s.parentName);
  const childrenQueryId = useAddFamilyMember((s) => s.childrenQueryId);
  const closeModal = useAddFamilyMember((s) => s.clearAddFamilyMember);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ShowIf
      condition={!!parentId}
      show={
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
          <div className={styles.modalContainer}>
            <h2>Add new child for {parentName}</h2>

            <form
              action={(formData) => {
                const familyMember = createFamilyMember(parentId);
                const name = formData.get("name") as string;
                familyMember.name = name;
                familyMember.childrenCount = 0;

                console.log({ familyMember });
                addFamilyMember({
                  parentId: familyMember.parentId,
                  familyMember,
                  childrenQueryId: childrenQueryId,
                });
                closeModal();
              }}
            >
              <label>
                Name:{" "}
                <input type="text" aria-label="Name" id="name" name="name" />
              </label>
              <button type="submit">Add new family</button>
            </form>
          </div>
        </div>
      }
    />
  );
};
