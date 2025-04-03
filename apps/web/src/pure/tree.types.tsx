export type FamilyMember = {
  id: string;
  name: string;
  parentId: string;
  birthday: string;
  childrenCount: number;
  customFields: CustomFields;
  deathDay?: string;
};

export type CustomFields = {
  [key: string]: any;
};

export type FamilyApiCall = {
  [parentId: FamilyMember["id"]]: FamilyMember[][];
};
