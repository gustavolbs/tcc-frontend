import React from "react";
import { Container as BoxContainer } from "./styles";

interface BoxProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({ children, className, ...props }) => {
  return (
    <BoxContainer>
      <div
        className={`relative flex flex-col items-center bg-white shadow-lg rounded-lg px-4 md:px-12 lg:px-16 py-10 w-full ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </div>
    </BoxContainer>
  );
};
