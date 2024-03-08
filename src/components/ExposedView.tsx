import { View } from "react-native";
import { ExposedViewProps } from "$/types/ExposedViewProps";
import { checkStyle } from "$/helpers/checkStyle";

const useColoredView =
  process.env.EXPOSE_VIEW === "true" ||
  process.env.EXPO_PUBLIC_EXPOSE_VIEW === "true";

const ColoredView = ({
  children,
  color,
  style = {},
  ...rest
}: ExposedViewProps) => {
  checkStyle(style);

  return (
    <View
      {...rest}
      style={{
        position: "relative",
        ...style,
      }}
    >
      <View
        style={{
          position: "absolute",
          borderColor: color,
          borderStyle: color ? "solid" : undefined,
          borderWidth: color ? 4 : undefined,
          backgroundColor: color,
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.55,
            backgroundColor: "white",
          }}
        />
      </View>
      {children}
    </View>
  );
};

const UncoloredView = ({ children, ...rest }: ExposedViewProps) => {
  return <View {...rest}>{children}</View>;
};

export const ExposedView = useColoredView ? ColoredView : UncoloredView;
