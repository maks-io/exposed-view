import { View } from "react-native";
import { ExposedViewProps } from "$/types/ExposedViewProps";
import { checkStyle } from "$/helpers/checkStyle";
import { useContext } from "react";
import ExposedViewContext from "$/context/ExposedViewContext";

export const ExposedView = ({
  children,
  color,
  expose = false,
  showWarnings = false,
  style = {},
  ...rest
}: ExposedViewProps) => {
  const { expose: exposeGlobal, showWarnings: showWarningsGlobal } =
    useContext(ExposedViewContext);

  const showWarningsEffective = !showWarnings ? false : showWarningsGlobal;
  const exposeEffective = exposeGlobal || expose;

  if (!exposeEffective) {
    return (
      <View style={{ ...style }} {...rest}>
        {children}
      </View>
    );
  }

  if (showWarningsEffective) {
    checkStyle(style);
  }

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
