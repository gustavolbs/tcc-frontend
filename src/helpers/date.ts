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

export const formatDateHour = (date: Date) => {
  date = new Date(date);

  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
