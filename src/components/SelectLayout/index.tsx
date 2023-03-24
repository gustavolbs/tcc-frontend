import React from "react";

import "./index.scss";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const SelectLayout: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select {...props} className="input-component">
      {children}
    </select>
  );
};
