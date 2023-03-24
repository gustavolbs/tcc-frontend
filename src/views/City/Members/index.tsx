import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import { api } from "../../../api";

import { LabelLayout } from "../../../components/LabelLayout";
import { SelectLayout } from "../../../components/SelectLayout";

import { useUser } from "../../../contexts/UserContext";

import { User } from "../../../interfaces/user";

import emailSVG from "../../../assets/email.svg";

import "./index.scss";

export const CityMembers: React.FC = () => {
  const { user, isAdmin, isOwner } = useUser();
  const [search, setSearch] = useState("");

  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchCityMembers() {
      try {
        const { data } = await api.getCityMembers(Number(user?.city));
        setMembers(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (user?.city) {
      fetchCityMembers();
    }
  }, [user?.city]);

  const availableRoles = ["resident", "manager", "owner"];

  isAdmin && availableRoles.push("admin");

  const handleChangeRole = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    member: User
  ) => {
    try {
      await api.updateRole(member.email, event.target.value);
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

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Cargo</th>
              </tr>
            </thead>

            <tbody>
              {members
                .filter((person) => person.email.includes(search))
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
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
