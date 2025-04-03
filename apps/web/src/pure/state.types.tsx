export type FamilyMemberVirtualizationState = {
  isOpen: boolean;
  isVisible: boolean;
  childrenQueryId: number;
  id: string;
};

export type VirtualizationState = {
  [id: string]: FamilyMemberVirtualizationState;
};

export type VirtualizationActions = {
  initializeVirtualizationState: (id: string) => void;
  setChildrenQueryId: (id: string, childrenQueryId: number) => void;
  setIsVisible: (id: string, isVisible: boolean) => void;
  toggleIsOpen: (id: string) => void;
};

export type DomStore = {
  domUpdateId: string;
} & {
  setDomUpdateId: (domUpdateId: string) => void;
};
