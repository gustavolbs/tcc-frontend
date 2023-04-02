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
          <tr key={`skeletonRow#${index}`}>
            {columns.map((key) => (
              <td key={key}>
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
    </>
  );
};
