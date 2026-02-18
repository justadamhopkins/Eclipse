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
