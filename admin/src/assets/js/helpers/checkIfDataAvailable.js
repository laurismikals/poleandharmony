export const checkIfDataAvailable = (...args) => {
  const filteredArgs = args.filter(item => {
    if (Array.isArray(item)) { return !!item?.length; }
    return false;
  });

  return filteredArgs.length === args.length;
};
