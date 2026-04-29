export const cleanObject = <T extends object = object>(object: T): T =>
  Object.entries(object).reduce(
    (acc, [key, val]: [string, string | object]) => {
      const isArray = Array.isArray(val);
      return val
        ? {
            ...acc,
            [key]: typeof val !== 'object' || isArray ? val : cleanObject(val),
          }
        : acc;
    },
    {} as T,
  );

export const omit = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const entries = Object.entries(obj);
  const filteredEntries = entries?.filter(([key]) => !keys.includes(key as K));
  return Object.fromEntries(filteredEntries) as Omit<T, K>;
};
