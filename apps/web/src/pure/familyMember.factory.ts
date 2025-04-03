import {
  randAnimal,
  randBook,
  randEmail,
  randFullName,
  randJobTitle,
  randMovie,
  randPastDate,
  randProduct,
  randRecentDate,
  randUuid,
} from "@ngneat/falso";
import type { FamilyApiCall, FamilyMember } from "./tree.types";
import { chance, chunkArray } from "./common.utils";

export const createFamilyMember = (parentId: string): FamilyMember => {
  const customFields = {
    profession: chance(50) ? randJobTitle() : undefined,
    favorite_book: chance(50) ? randBook() : undefined,
    favorite_movie: chance(50) ? randMovie() : undefined,
    favorite_animal: chance(50) ? randAnimal() : undefined,
    favorite_product: chance(50) ? randProduct() : undefined,
    email: chance(50) ? randEmail() : undefined,
  };

  const childrenCount = 10; // = chance(100) ? getRandomInt(10) : 0; // 50% chance of having children, randomly have children between 0 - 1000

  console.log({ childrenCount });
  return {
    id: randUuid(),
    name: randFullName(),
    parentId,
    birthday: randPastDate().toString(),
    childrenCount,
    deathDay: chance(50) ? randRecentDate().toString() : undefined,
    customFields,
  };
};

export const createTree = () => {
  const tree: FamilyApiCall = {};
  const queueEntry: FamilyMember[] = [];
  const queueAccess: FamilyMember[] = [];

  // initialize tree with root ancestor
  const firstKnownAncestor = createFamilyMember("unknown");
  tree["unknown"] = [[firstKnownAncestor]];
  queueEntry.push(firstKnownAncestor);

  while (true) {
    while (queueEntry.length) {
      queueAccess.push(queueEntry.pop() as FamilyMember);
    }

    if (!queueAccess.length) {
      break;
    }

    // dequeue family members in the order they are created
    const parent = queueAccess.pop() as FamilyMember;
    console.log({ parent });

    // create progeny
    const progeny = createGeneration(parent);

    // assign progeny to be queued to have children
    queueEntry.push(...progeny);

    // assign progeny to tree and schedule them to the queue
    console.log({ progenyCount: progeny.length });
    tree[parent.id] = chunkArray<FamilyMember>(progeny, 50);

    if (chance(5)) {
      break;
    }
  }

  console.log({ tree });
  return tree;
};

export const createGeneration = (parent: FamilyMember) => {
  const children = [];

  for (let x = 0; x < parent.childrenCount; x += 1) {
    const child = createFamilyMember(parent.id);
    children.push(child);
  }

  return children;
};
