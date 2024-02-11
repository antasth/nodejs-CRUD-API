export const getUserIdFromUrl = (url: string): string | null => {
  const regex = /\/([^/]+)$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
