import React from "react";

import { StyledSelect } from "./styles";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

export const SelectLayout: React.FC<SelectProps> = ({ children, ...props }) => {
  return <StyledSelect {...props}>{children}</StyledSelect>;
};
