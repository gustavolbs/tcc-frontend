import Skeleton from "react-loading-skeleton";

import React from "react";

interface SkeletonTableRowProps {
  columns: string[];
}

export const SkeletonTableRow: React.FC<SkeletonTableRowProps> = ({
  columns,
}) => {
  return (
    <>
      {Array(5)
        .fill(1)
        .map((row, index) => (
          <tr
            key={`skeletonRow#${index}`}
            className={`${index % 2 !== 0 ? "bg-blue-100" : ""}`}
          >
            {columns.map((key) => (
              <td key={key} className="text-center py-4 px-6">
                <Skeleton baseColor="#5294e0" highlightColor="#96c7ff" />
              </td>
            ))}
          </tr>
        ))}
    </>
  );
};
