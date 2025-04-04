import type { FamilyMember } from "@/pure/tree.types";
import { useQueryClient } from "@tanstack/react-query";

export const useMutateFamilyMember = () => {
  const queryClient = useQueryClient();

  const addFamilyMember = ({
    parentId,
    childrenQueryId,
    familyMember,
  }: {
    parentId: string;
    childrenQueryId: number;
    familyMember: FamilyMember;
  }) => {
    queryClient.setQueryData(
      [parentId, childrenQueryId],
      (prev: FamilyMember[]) => {
        return [...prev, familyMember];
      }
    );
  };

  const mutateFamilyMember = ({
    parentId,
    parentsQueryId,
    familyMember,
  }: {
    parentId: string;
    parentsQueryId: number;
    familyMember: FamilyMember;
  }) => {
    queryClient.setQueryData(
      [parentId, parentsQueryId],
      (prev: FamilyMember[]) => {
        const newData = prev.map((item) =>
          item.id === familyMember.id ? familyMember : item
        );

        return newData;
      }
    );
  };

  return {
    addFamilyMember,
    mutateFamilyMember,
  };
};
