type UrlTemplate = string;
type UrlParams = { [key: string]: string | number };

export const urlFromTemplate = (
  urlTemplate: UrlTemplate,
  params: UrlParams
) => {
  return urlTemplate.replaceAll(/{(\w+)}/g, (match, key) => `${params[key]}`);
};
