const parseNumber = (number, defVal) => {
  if (typeof number !== 'string') return defVal;

  const parsedNumber = parseInt(number);

  return Number.isNaN(parsedNumber) ? defVal : parsedNumber;
};

export const parsePaginationParams = ({ page, perPage }) => {
  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
