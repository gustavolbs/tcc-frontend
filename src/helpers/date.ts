export const formatDate = (date: Date) => {
  date = new Date(date);

  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
