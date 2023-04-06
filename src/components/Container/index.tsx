import React from "react";

export const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center w-full py-8 px-4 md:px-24 md:py-8 md:pl-0">
      {children}
    </div>
  );
};
