import React, { createContext, useMemo } from "react";
import { ColorValue } from "react-native";
import { CommonProps } from "$/types/CommonProps";

type ExposedViewContextProps = React.PropsWithChildren & {
  exposeGlobal: boolean;
  exposeOverride?: boolean;
  addAttributes?: boolean;
  fontSize?: number;
  borderWidth?: number;
  backgroundOpacity?: number;
  showPrefix?: boolean;
  prefixForWidth?: string;
  prefixForHeight?: string;
  prefixForX?: string;
  prefixForY?: string;
  colorForWidth?: ColorValue;
  colorForHeight?: ColorValue;
  colorForX?: ColorValue;
  colorForY?: ColorValue;
} & CommonProps;

export const ExposedViewContext = createContext<ExposedViewContextProps>(
  {} as ExposedViewContextProps,
);

export const ExposedViewContextProvider = ({
  children,
  exposeGlobal,
  addAttributes = true,
  exposeOverride,
  fontSize,
  borderWidth,
  backgroundOpacity,
  showPrefix,
  prefixForWidth,
  prefixForHeight,
  prefixForX,
  prefixForY,
  colorForWidth,
  colorForHeight,
  colorForX,
  colorForY,
  showWarnings = true,
  showDimensions = true,
  showPosition = true,
  showUnit = false,
  heightPosition = "right",
  widthPosition = "bottom",
}: ExposedViewContextProps) => {
  const value = useMemo(
    () => ({
      exposeGlobal,
      exposeOverride,
      addAttributes,
      fontSize,
      borderWidth,
      backgroundOpacity,
      showPrefix,
      prefixForWidth,
      prefixForHeight,
      prefixForX,
      prefixForY,
      colorForWidth,
      colorForHeight,
      colorForX,
      colorForY,
      showWarnings,
      showDimensions,
      showPosition,
      showUnit,
      heightPosition,
      widthPosition,
    }),
    [
      exposeGlobal,
      exposeOverride,
      addAttributes,
      fontSize,
      borderWidth,
      backgroundOpacity,
      showPrefix,
      prefixForWidth,
      prefixForHeight,
      prefixForX,
      prefixForY,
      colorForWidth,
      colorForHeight,
      colorForX,
      colorForY,
      showWarnings,
      showDimensions,
      showPosition,
      showUnit,
      heightPosition,
      widthPosition,
    ],
  );
  return (
    <ExposedViewContext.Provider value={value}>
      {children}
    </ExposedViewContext.Provider>
  );
};

export default ExposedViewContext;
