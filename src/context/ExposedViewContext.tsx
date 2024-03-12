import React, { createContext } from "react";

type ExposedViewContextProps = React.PropsWithChildren & {
  showWarnings?: boolean;
  expose: boolean;
};

export const ExposedViewContext = createContext<ExposedViewContextProps>(
  {} as ExposedViewContextProps,
);

export const ExposedViewContextProvider = ({
  children,
  showWarnings = true,
  expose,
}: ExposedViewContextProps) => {
  return (
    <ExposedViewContext.Provider value={{ showWarnings, expose }}>
      {children}
    </ExposedViewContext.Provider>
  );
};

export default ExposedViewContext;
