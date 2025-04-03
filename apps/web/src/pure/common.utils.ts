export const chunkArray = <T = any>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  let i = 0;

  while (i < arr.length) {
    result.push(arr.slice(i, i + size));
    i += size;
  }

  return result;
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const chance = (liklihoodIsTrue: number): boolean => {
  return Math.random() * 100 < liklihoodIsTrue;
};

export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
