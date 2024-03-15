import { ViewStyle } from "react-native";
import { CSSProperties, PropsWithChildren } from "react";
import { CommonProps } from "$/types/CommonProps";

interface AdditionalViewProps {
  expose?: boolean;
  style?: ViewStyle;
  color: CSSProperties["color"];
}

export type ExposedViewProps = PropsWithChildren &
  Omit<ViewStyle, "style"> &
  AdditionalViewProps &
  CommonProps;
