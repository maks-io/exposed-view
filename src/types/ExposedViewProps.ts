import { ViewProps, ViewStyle } from "react-native";
import { CSSProperties } from "react";

export interface ExposedViewProps extends ViewProps {
  style?: ViewStyle;
  color: CSSProperties["color"];
}
