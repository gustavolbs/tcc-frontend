export interface Category {
  name: string;
  value: string;
  placeholder: string;
}

export const AVAILABLE_CATEGORIES: Category[] = [
  {
    name: "Buraco",
    value: "pothole",
    placeholder:
      "O buraco possui mais de X centímetros/metros e um ponto de referência é Y",
  },
  {
    name: "Iluminação pública",
    value: "streetLighting",
    placeholder:
      "X postes de luz estão com a lâmpada falhando e um ponto de referência é Y",
  },
  {
    name: "Árvore caída",
    value: "fallenTree",
    placeholder:
      "Uma árvore caiu/possui risco de queda e um ponto de referência é Y",
  },
  {
    name: "Pichação",
    value: "graffiti",
    placeholder:
      "Uma pichação de X metros foi feita no local e um ponto de referência é Y",
  },
  {
    name: "Carro abandonado",
    value: "abandonedCar",
    placeholder:
      "Um carro foi abandonado no local X e um ponto de referência é Y",
  },
  {
    name: "Rua não calçada/asfaltada",
    value: "unpavedRoad",
    placeholder:
      "O trecho X na rua Y ainda não foi (calçado/asfaltado) e um ponto de referência é Z",
  },
];

export const findCategoryName = (name: string): string | undefined => {
  return AVAILABLE_CATEGORIES.find((c) => c.value === name)?.name;
};
