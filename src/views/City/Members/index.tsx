import React, { useState } from "react";
import { ReactSVG } from "react-svg";

import { api } from "../../../api/client";
import { notify } from "../../../helpers/notify";

import { LabelLayout } from "../../../components/LabelLayout";
import { MembersTable } from "../../../components/MembersTable";

import { useUser } from "../../../contexts/UserContext";

import { User } from "../../../interfaces/user";

import emailSVG from "../../../assets/email.svg";

export const CityMembers: React.FC = () => {
  const { user, isAdmin } = useUser();
  const [search, setSearch] = useState("");

  const { data: members, isLoading: isLoadingMembers } = api.getCityMembers(
    Number(user?.city)
  );

  const availableRoles = ["resident", "manager", "owner"];

  isAdmin && availableRoles.push("admin");

  const handleChangeRole = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    member: User,
    setUpdating: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setUpdating(true);
      await api.updateRole(member.email, event.target.value);
      notify("success", `Cargo atualizado com sucesso!`);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <h2>Gerenciar Gestores</h2>
      <span className="w-full sm:w-1/2 text-center mb-4">
        Lembre-se: todos os usuários da sua cidade estão sendo exibidos aqui.
        Atribua os cargos aos usuários que deseja que sejam gestores de sua
        cidade.
      </span>

      {members?.length && !isLoadingMembers ? (
        <LabelLayout htmlFor="email" className="w-full sm:w-1/2">
          <ReactSVG src={emailSVG} />
          <input
            type="text"
            id="email"
            placeholder="Procure pelo email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </LabelLayout>
      ) : null}

      <MembersTable
        availableRoles={availableRoles}
        handleChangeRole={handleChangeRole}
        isLoadingMembers={isLoadingMembers}
        members={members}
        search={search}
      />
    </>
  );
};
