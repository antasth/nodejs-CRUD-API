export const getUserIdFromUrl = (url: string): string | null => {
  const regex = /\/([^/]+)$/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const isProvidedUserIdValid = (id: string | null) => {
  const regex = /^.{8}-.{4}-.{4}-.{4}-.{12}$/;
  return id ? regex.test(id) : false;
};
