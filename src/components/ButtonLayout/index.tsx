import React from "react";
import { Oval } from "react-loader-spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const ButtonLayout: React.FC<ButtonProps> = ({
  children,
  isLoading,
  className,
  ...props
}) => {
  return (
    <button
      className={`flex justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold mx-auto rounded-lg py-4 px-8 transition-colors ${
        className || ""
      }`}
      {...props}
    >
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
