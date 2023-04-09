export const STATUSES = [
  {
    name: "Aberto",
    value: "open",
  },
  {
    name: "Aguardando fiscal",
    value: "Waiting for fiscal",
  },
  {
    name: "Aguardando gestor",
    value: "Waiting for manager",
  },
  {
    name: "Aguardando ação do gestor",
    value: "Waiting for manager action",
  },
  {
    name: "Aguardando resposta do usuário",
    value: "Waiting for reporter response",
  },
  {
    name: "Resolvido",
    value: "Solved",
  },
];

export const findStatusName = (name: string): string | undefined => {
  return STATUSES.find((c) => c.value === name)?.name;
};
