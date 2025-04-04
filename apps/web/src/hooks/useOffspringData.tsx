import { useQuery, useQueryClient } from "@tanstack/react-query";
import { familyApiCalls } from "@/data/family.data";
import type { FamilyMember } from "@/pure/tree.types";
import { delay } from "@/pure/common.utils";

export const useOffspringData = ({
  familyMemberId,
  childrenQueryId,
  childrenCount,
  isFamilyMemberExpanded,
}: {
  familyMemberId: string;
  childrenQueryId: number;
  childrenCount: number;
  isFamilyMemberExpanded: boolean;
}) => {
  const queryClient = useQueryClient();

  // query for children
  const response = useQuery<FamilyMember[]>({
    queryKey: [familyMemberId, childrenQueryId],
    queryFn: async () => {
      await delay(1000);
      // fake response to simulate api call
      const allChildren = familyApiCalls[familyMemberId] || [];
      const apiResponse = allChildren[childrenQueryId] || [];
      apiResponse.forEach((familyMember) => {
        const queryKey: string[] = ["individual", familyMember.id];
        queryClient.setQueryData(queryKey, () => familyMember);
      });
      return apiResponse;
    },
    enabled: isFamilyMemberExpanded && !!childrenCount,
    staleTime: Infinity,
  });

  const {
    data: familyMembersChildren = [],
    isPending: isLoadingChildren,
    isError: isErrorLoadingChildren,
    error,
  } = response;

  return {
    familyMembersChildren,
    isLoadingChildren,
    isErrorLoadingChildren,
    error,
  };
};
