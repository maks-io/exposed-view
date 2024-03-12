import { ViewProps, ViewStyle } from "react-native";
import { CSSProperties } from "react";

export interface ExposedViewProps extends ViewProps {
  showWarnings?: boolean;
  expose?: boolean;
  style?: ViewStyle;
  color: CSSProperties["color"];
}
