import { useQuery } from "@tanstack/react-query";
import { familyApiCalls } from "@/data/family.data";
import type { FamilyMember } from "@/pure/tree.types";
import { delay } from "@/pure/common.utils";

export const useEarliestAncestorOffspringData = () => {
  const parentId = "unknown";
  const response = useQuery<FamilyMember>({
    queryKey: [parentId],
    queryFn: async () => {
      // fake response to simulate api call
      await delay(1000);
      const allChildren = familyApiCalls[parentId] || [];
      const apiResponse = allChildren[0] || [];
      const useEarliestAncestor = apiResponse.pop();
      if (!useEarliestAncestor) {
        throw new Error("Error loading earliest ancestor");
      }
      return useEarliestAncestor as FamilyMember;
    },
    staleTime: Infinity,
  });

  const {
    data: earliestAncestor,
    isPending: isLoadingEarliestAncestor,
    isError: isErrorLoadingEarliestAncestor,
    error,
  } = response;

  return {
    earliestAncestor,
    isLoadingEarliestAncestor,
    isErrorLoadingEarliestAncestor,
    error,
  };
};
