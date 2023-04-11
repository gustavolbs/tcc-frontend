import React from "react";
import { Link } from "react-router-dom";

import { Issue } from "../../interfaces/issue";

import { formatDate } from "../../helpers/date";
import { findCategoryName } from "../../helpers/issue-categories";
import { findStatusName } from "../../helpers/status";

import { SkeletonTableRow } from "../Skeletons/TableRow";

interface IssuesTableProps {
  issues: Issue[] | undefined;
  isLoading: boolean;
}

const TABLE_KEYS = [
  "Identificador",
  "Status",
  "Relator",
  "Última atualização",
  "Criado em",
  "Link para acesso",
];

export const IssuesTable: React.FC<IssuesTableProps> = ({
  issues,
  isLoading,
}) => {
  return (
    <div className="overflow-x-auto w-full">
      {!issues?.length && !isLoading && (
        <div className="mt-4">Nenhum resultado encontrado</div>
      )}

      <table className="w-full mt-8 border-collapse text-sm md:text-base">
        <thead>
          <tr className="bg-blue-500 font-bold">
            {TABLE_KEYS.map((key) => (
              <td key={`issuesHeader#${key}`} className="py-4 px-6 text-center">
                {key}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <SkeletonTableRow columns={TABLE_KEYS} />
          ) : (
            issues?.map((issue, index) => (
              <tr
                key={issue.id}
                className={`${index % 2 !== 0 ? "bg-blue-100" : ""}`}
              >
                <td className="text-center py-4 px-6">
                  <Link to={`/issues/${issue.id}`}>
                    {findCategoryName(issue.category)} #{issue.id}
                  </Link>
                </td>
                <td className="text-center py-4 px-6">
                  {findStatusName(issue.status)}
                </td>
                <td className="text-center py-4 px-6">
                  {issue.reporter?.name} {issue.reporter?.surname}
                </td>
                <td className="text-center py-4 px-6">
                  {formatDate(issue.updatedAt)}
                </td>
                <td className="text-center py-4 px-6">
                  {formatDate(issue.createdAt)}
                </td>
                <td className="text-center py-4 px-6">
                  <Link to={`/issues/${issue.id}`}>Visualizar</Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
