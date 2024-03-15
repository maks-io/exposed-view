import { LayoutRectangle, Platform, Text, View } from "react-native";
import { Label } from "$/components/Label";
import { useContext } from "react";
import ExposedViewContext from "$/context/ExposedViewContext";
import { defaultColors } from "$/config/defaultColors";
import { defaultPrefixes } from "$/config/defaultPrefixes";

interface PositionProps {
  layoutRectangle: LayoutRectangle;
  showUnit?: boolean;
}
export const Position = ({ layoutRectangle, showUnit }: PositionProps) => {
  const {
    showUnit: showUnitGlobal,
    prefixForX: prefixForXGlobal,
    prefixForY: prefixForYGlobal,
    colorForX: colorForXGlobal,
    colorForY: colorForYGlobal,
  } = useContext(ExposedViewContext);
  const showUnitEffective = showUnit === undefined ? showUnitGlobal : showUnit;
  const unit = showUnitEffective ? "px" : "";
  const { x, y } = layoutRectangle;
  const xRounded = Math.round(x);
  const yRounded = Math.round(y);
  const xIsExact = x === xRounded;
  const yIsExact = y === yRounded;
  const xFormatted = `${xIsExact ? "" : "~"}${xRounded}${unit}`;
  const yFormatted = `${yIsExact ? "" : "~"}${yRounded}${unit}`;
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: -100,
          left: 0,
          height: 100,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Label
          prefix={prefixForXGlobal ?? defaultPrefixes.x}
          value={xFormatted}
          backgroundColor={colorForXGlobal ?? defaultColors.x}
        />
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: -100,
          width: 100,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Label
          prefix={prefixForYGlobal ?? defaultPrefixes.y}
          value={yFormatted}
          backgroundColor={colorForYGlobal ?? defaultColors.y}
        />
      </View>
    </View>
  );
};
