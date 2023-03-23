import React from "react";

import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/UserContext";

export const HomePage: React.FC = () => {
  const { city } = useCity();
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Nenhum usuário encontrado</div>;
  }

  return (
    <div>
      <h1>Home - {city?.name}</h1>
      <h1>
        {user.name} - {user.role}
      </h1>
      <p>{user.email}</p>
    </div>
  );
};
