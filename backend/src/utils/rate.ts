export const calcRate = (part: number, total: number): number => {
  if (total === 0) return 0;
  return Number(((part / total) * 100).toFixed(2));
};