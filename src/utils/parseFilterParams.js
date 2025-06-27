const parseType = (type) => {
  if (typeof type !== 'string') return;

  const isType = ['work', 'home', 'personal'].includes(type);
  if (isType) return type;
};

const parseIsFavourite = (isFav) => {
  return typeof isFav === 'string' ? isFav === 'true' : Boolean(isFav);
};

export const parseFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    type: parsedType,
    isFavotite: parsedIsFavourite,
  };
};
