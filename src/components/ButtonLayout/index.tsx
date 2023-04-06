import React from "react";
import { Oval } from "react-loader-spinner";

import "./index.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const ButtonLayout: React.FC<ButtonProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <button {...props}>
      {isLoading ? (
        <Oval
          color="#fff"
          height={24}
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      ) : (
        children
      )}
    </button>
  );
};
