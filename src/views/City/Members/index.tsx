import React, { useState } from "react";
import { ReactSVG } from "react-svg";

import { api } from "../../../api/client";
import { notify } from "../../../helpers/notify";

import { LabelLayout } from "../../../components/LabelLayout";
import { SelectLayout } from "../../../components/SelectLayout";
import { SkeletonTableRow } from "../../../components/Skeletons/TableRow";

import { useUser } from "../../../contexts/UserContext";

import { User } from "../../../interfaces/user";

import emailSVG from "../../../assets/email.svg";

import "./index.scss";

export const CityMembers: React.FC = () => {
  const { user, isAdmin } = useUser();
  const [search, setSearch] = useState("");

  const {
    data: members,
    isError,
    isLoading,
  } = api.getCityMembers(Number(user?.city));

  const availableRoles = ["resident", "manager", "owner"];

  isAdmin && availableRoles.push("admin");

  const handleChangeRole = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    member: User
  ) => {
    try {
      await api.updateRole(member.email, event.target.value);
      notify("success", `Cargo atualizado com sucesso!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="box-manage-members">
        <h2>Gerenciar Gestores</h2>
        <span>
          Lembre-se: todos os usuários da sua cidade estão sendo exibidos aqui.
          Atribua os cargos aos usuários que deseja que sejam gestores de sua
          cidade.
        </span>

        {members?.length && !isLoading && (
          <LabelLayout htmlFor="email">
            <ReactSVG src={emailSVG} />
            <input
              type="text"
              id="email"
              placeholder="Procure pelo email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </LabelLayout>
        )}

        <MembersTable
          availableRoles={availableRoles}
          handleChangeRole={handleChangeRole}
          isLoading={isLoading}
          members={members}
          search={search}
        />
      </div>
    </div>
  );
};

interface MembersTableProps {
  availableRoles: string[];
  handleChangeRole: (
    event: React.ChangeEvent<HTMLSelectElement>,
    member: User
  ) => void;
  isLoading: boolean;
  members: User[] | undefined;
  search: string;
}

const MembersTable: React.FC<MembersTableProps> = ({
  availableRoles,
  handleChangeRole,
  isLoading,
  members,
  search,
}) => {
  const { user, isAdmin, isOwner } = useUser();

  const headerKeys = ["id", "Nome", "Email", "Cargo"];

  return (
    <div className="table-container">
      {!members?.length && !isLoading && <div>Nenhum resultado encontrado</div>}

      <table>
        <thead>
          <tr>
            {headerKeys.map((key) => (
              <td id={`membersHeader#${key}`}>{key}</td>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <SkeletonTableRow columns={headerKeys} />
          ) : (
            members
              ?.filter((person) => person.email.includes(search))
              .map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>
                    {member.name} {member.surname}
                  </td>
                  <td>{member.email}</td>
                  <td>
                    {(isAdmin || (isOwner && member.role !== "admin")) &&
                    user?.id !== member.id ? (
                      <SelectLayout
                        onChange={(e) => handleChangeRole(e, member)}
                        defaultValue={member.role}
                      >
                        {availableRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </SelectLayout>
                    ) : (
                      member.role
                    )}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};
