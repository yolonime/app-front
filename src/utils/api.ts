export const get = async (url: string) => {
  const data = await fetch(url);
  const json = await data.json();

  return json;
};
