export const checkIfLoading = (...args) => (
  args.filter(item => !item?.isLoading).length !== args.length
);
