export const STATUSES = [
  {
    name: "Aberto",
    value: "open",
  },
];

export const findStatusName = (name: string): string | undefined => {
  return STATUSES.find((c) => c.value === name)?.name;
};
