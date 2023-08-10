export const isStrOrNotNaNNum = (value: any) => {
  return (typeof value === 'number' || typeof value === 'string') && !isNaN(value as number);
};
