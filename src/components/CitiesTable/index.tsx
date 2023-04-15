import React, { useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineLink } from "react-icons/ai";
import { Link } from "react-router-dom";

import { api } from "../../api/client";
import { notify } from "../../helpers/notify";

import { City } from "../../interfaces/city";
import { User } from "../../interfaces/user";

import { useCity } from "../../contexts/CityContext";
import { useUser } from "../../contexts/UserContext";

import { DeleteModal } from "../DeleteModal";
import { SkeletonTableRow } from "../Skeletons/TableRow";
import { ButtonLayout } from "../ButtonLayout";

interface CitiesTableProps {
  cities: City[] | undefined;
  isLoadingCities: boolean;
}

const TABLE_KEYS = ["ID", "Nome", "Link para acesso", "Editar", "Deletar"];

export const CitiesTable: React.FC<CitiesTableProps> = ({
  cities,
  isLoadingCities,
}) => {
  const { setCurrentUser } = useUser();
  const { city, setCurrentCity } = useCity();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const onOpenModal = (city: City) => {
    setOpen(true);
    setSelectedCity(city);
  };

  const onCloseModal = () => setOpen(false);

  const handleAcessCity = (cityId: number) => {
    setCurrentUser((curr) => ({ ...(curr as User), city: cityId }));
    if (cityId !== city?.id) {
      setCurrentCity(null);
    }
  };

  const handleDeleteCity = async () => {
    setIsLoading(true);

    try {
      await api.deleteCity(Number(selectedCity?.id));
      notify("success", `Cidade excluída com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <DeleteModal
        handleDelete={handleDeleteCity}
        isLoading={isLoading}
        onCloseModal={onCloseModal}
        open={open}
        selected={Number(selectedCity?.id)}
        objectName="cidade"
        dataName={selectedCity?.name}
      />

      <div className="flex justify-between items-baseline mt-4">
        {!cities?.length && !isLoadingCities && (
          <div>Nenhum resultado encontrado</div>
        )}

        <Link to="/city/create" className="ml-auto">
          <ButtonLayout type="button" className="py-1.5">
            Adicionar
          </ButtonLayout>
        </Link>
      </div>

      <table className="w-full mt-8 border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-blue-500 font-bold">
            {TABLE_KEYS.map((key) => (
              <td key={`citiesHeader#${key}`} className="py-4 px-6 text-center">
                {key}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoadingCities ? (
            <SkeletonTableRow columns={TABLE_KEYS} />
          ) : (
            cities?.map((city, index) => (
              <tr
                key={city.id}
                className={`${index % 2 !== 0 ? "bg-blue-100" : ""}`}
              >
                <td className="text-center py-4 px-6">{city.id}</td>
                <td className="text-center py-4 px-6">{city.name}</td>
                <td className="py-4 px-6 ">
                  <Link
                    to="/dashboard"
                    className="flex gap-1 justify-center transition text-blue-800 hover:text-blue-500 cursor-pointer "
                    onClick={() => handleAcessCity(city.id)}
                  >
                    Acessar <AiOutlineLink className="w-5 h-auto" />
                  </Link>
                </td>
                <td className="py-4 px-6">
                  <Link
                    to="/city/edit"
                    className="flex gap-1 justify-center transition text-blue-800 hover:text-blue-500 cursor-pointer"
                    onClick={() => handleAcessCity(city.id)}
                  >
                    <AiFillEdit className="w-5 h-auto" />
                  </Link>
                </td>
                <td
                  className="text-center py-4 px-6 text-center transition text-blue-800 hover:text-blue-500 cursor-pointer"
                  onClick={() => onOpenModal(city)}
                >
                  <AiFillDelete className="m-auto w-5 h-auto" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
