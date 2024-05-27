export const convertToCamelCase = (value: string, separator = ' '): string =>
  value
    .toLocaleLowerCase()
    .split(separator)
    .map((value, idx) =>
      idx === 0 ? value : value[0].toUpperCase() + value.slice(1)
    )
    .join('');
