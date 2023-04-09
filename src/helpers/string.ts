export const makeLinksClickable = (text: string) => {
  // Regex para encontrar URLs no texto
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Substituir URLs por links clicáveis
  return text.replace(
    urlRegex,
    '<a href="$&" class="underline text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">$&</a>'
  );
};
