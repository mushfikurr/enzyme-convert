export const getFileNameWithoutExtension = (file: File) => {
  const name = file.name;
  const lastDotIndex = name.lastIndexOf(".");

  return lastDotIndex === -1 ? name : name.substring(0, lastDotIndex);
};
