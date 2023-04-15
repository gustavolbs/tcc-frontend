export const makeLinksClickable = (text: string) => {
  // Regex para encontrar URLs no texto
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Substituir URLs por links clicáveis
  return text.replace(
    urlRegex,
    '<a href="$&" class="underline text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">$&</a>'
  );
};

export const slugify = (...args: (string | number)[]): string => {
  const value = args.join(" ");

  // check if the value is already in slug format
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    return value;
  }

  return value
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "-"); // separator
};
