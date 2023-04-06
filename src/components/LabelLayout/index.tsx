import React from "react";
import { StyledLabel } from "./styles";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const LabelLayout: React.FC<LabelProps> = ({ children, ...props }) => {
  return <StyledLabel {...props}>{children}</StyledLabel>;
};
