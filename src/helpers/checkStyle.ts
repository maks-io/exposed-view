import { ViewStyle } from "react-native";

const propsToCheck = [
  "borderColor",
  "borderStyle",
  "borderWidth",
  "backgroundColor",
];

export const checkStyle = (style: ViewStyle): void => {
  propsToCheck.forEach((prop: string) => {
    // @ts-ignore
    if (style?.[prop]) {
      console.warn(
        `You are passing the prop '${prop}' to ExtendedView, which might mess with its style.`,
      );
    }
  });
};
