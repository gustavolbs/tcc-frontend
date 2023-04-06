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
    <div className="table-container">
      {!issues?.length && !isLoading && <div>Nenhum resultado encontrado</div>}

      <table>
        <thead>
          <tr>
            {TABLE_KEYS.map((key) => (
              <td key={`issuesHeader#${key}`}>{key}</td>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <SkeletonTableRow columns={TABLE_KEYS} />
          ) : (
            issues?.map((issue) => (
              <tr key={issue.id}>
                <td>
                  <Link to={`/issues/${issue.id}`}>
                    {findCategoryName(issue.category)} #{issue.id}
                  </Link>
                </td>
                <td>{findStatusName(issue.status)}</td>
                <td>
                  {issue.reporter?.name} {issue.reporter?.surname}
                </td>
                <td>{formatDate(issue.updatedAt)}</td>
                <td>{formatDate(issue.createdAt)}</td>
                <td>
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
