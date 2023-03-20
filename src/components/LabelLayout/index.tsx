import React from "react";
import "./index.scss";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const LabelLayout: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label {...props} className="input-component">
      {children}
    </label>
  );
};
