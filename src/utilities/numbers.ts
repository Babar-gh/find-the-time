export const parsePositiveInt = (input: string) => Math.abs(parseInt(input));

export const treatNaNAsZero = (number: number) => (isNaN(number) ? 0 : number);

export const treatNaNAsEmptyString = (number: number) =>
  isNaN(number) ? '' : number;
