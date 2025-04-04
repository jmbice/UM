import type {
  DomStore,
  VirtualizationActions,
  VirtualizationState,
} from "@/pure/state.types";
import { create } from "zustand";

// ADD FAMILY MEMBER
export type AddFamilyMember = {
  parentId: string;
  parentName: string;
  childrenQueryId: number;
} & {
  setAddFamilyMember: (
    parentId: string,
    parentName: string,
    childrenQueryId: number
  ) => void;
  clearAddFamilyMember: () => void;
};

export const useAddFamilyMember = create<AddFamilyMember>((set) => ({
  parentId: "",
  parentName: "",
  childrenQueryId: 0,
  setAddFamilyMember: (parentId, parentName, childrenQueryId) =>
    set(() => ({
      parentId,
      parentName,
      childrenQueryId,
    })),
  clearAddFamilyMember: () =>
    set(() => ({
      parentId: "",
      parentName: "",
      childrenQueryId: 0,
    })),
}));

////////

// DOM-UPDATE STORE
export const useDomUpdateStore = create<DomStore>((set) => ({
  domUpdateId: "",
  setDomUpdateId: (domUpdateId: string) => set((_) => ({ domUpdateId })),
}));

// VIRTUALIZATION STORE
export const useVirtualizationStore = create<{
  state: VirtualizationState;
  actions: VirtualizationActions;
}>((set) => ({
  state: {}, // Initialize state as an empty object
  actions: {
    initializeVirtualizationState: (id) =>
      set((store) => ({
        state: {
          ...store.state,
          [id]: { id, childrenQueryId: 0, isVisible: true, isOpen: false },
        },
      })),
    setChildrenQueryId: (id, childrenQueryId) =>
      set((store) => ({
        state: {
          ...store.state,
          [id]: { ...store.state[id], childrenQueryId },
        },
      })),
    setIsVisible: (id, isVisible) =>
      set((store) => {
        return {
          state: {
            ...store.state,
            [id]: { ...store.state[id], isVisible },
          },
        };
      }),
    toggleIsOpen: (id) =>
      set((store) => {
        return {
          state: {
            ...store.state,
            [id]: {
              ...store.state[id],
              isOpen: !store.state[id].isOpen || false,
            },
          },
        };
      }),
  },
}));
