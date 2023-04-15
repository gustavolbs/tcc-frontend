import { useState } from "react";

import { useUser } from "../../contexts/UserContext";

import { User } from "../../interfaces/user";

import { SelectLayout } from "../SelectLayout";
import { SkeletonTableRow } from "../Skeletons/TableRow";

interface MembersTableProps {
  availableRoles: string[];
  handleChangeRole: (
    event: React.ChangeEvent<HTMLSelectElement>,
    member: User,
    setUpdating: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  isLoadingMembers: boolean;
  members: User[] | undefined;
  search: string;
}

export const MembersTable: React.FC<MembersTableProps> = ({
  availableRoles,
  handleChangeRole,
  isLoadingMembers,
  members,
  search,
}) => {
  const { user, isAdmin, isOwner } = useUser();
  const [isUpdating, setUpdating] = useState(false);

  const headerKeys = ["id", "Nome", "Email", "Cargo"];

  return (
    <div className="overflow-x-auto w-full">
      {!members?.length && !isLoadingMembers && (
        <div className="mt-4">Nenhum resultado encontrado</div>
      )}

      <table className="w-full mt-8 border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-blue-500 font-bold">
            {headerKeys.map((key) => (
              <td
                key={`membersHeader#${key}`}
                className="py-4 px-6 text-center"
              >
                {key}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoadingMembers ? (
            <SkeletonTableRow columns={headerKeys} />
          ) : (
            members
              ?.filter((person) => person.email.includes(search))
              .map((member, index) => (
                <tr
                  key={member.id}
                  className={`${index % 2 !== 0 ? "bg-blue-100" : ""}`}
                >
                  <td className="text-center py-4 px-6">{member.id}</td>
                  <td className="text-center py-4 px-6">
                    {member.name} {member.surname}
                  </td>
                  <td className="text-center py-4 px-6">{member.email}</td>
                  <td className="text-center py-4 px-6 min-w-[12rem]">
                    {(isAdmin || (isOwner && member.role !== "admin")) &&
                    user?.id !== member.id ? (
                      <SelectLayout
                        onChange={(e) =>
                          handleChangeRole(e, member, setUpdating)
                        }
                        defaultValue={member.role}
                        disabled={isUpdating}
                        className="w-full"
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
