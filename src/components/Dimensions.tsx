import { LayoutRectangle, View } from "react-native";
import { useContext } from "react";
import ExposedViewContext from "$/context/ExposedViewContext";
import { Label } from "$/components/Label";
import { defaultColors } from "$/config/defaultColors";
import { defaultPrefixes } from "$/config/defaultPrefixes";

interface DimensionsProps {
  layoutRectangle: LayoutRectangle;
  widthPosition?: "top" | "bottom";
  heightPosition?: "left" | "right";
  showUnit?: boolean;
}

export const Dimensions = ({
  layoutRectangle,
  widthPosition,
  heightPosition,
  showUnit,
}: DimensionsProps) => {
  const {
    widthPosition: widthPositionGlobal,
    heightPosition: heightPositionGlobal,
    showUnit: showUnitGlobal,
    prefixForWidth: prefixForWidthGlobal,
    prefixForHeight: prefixForHeightGlobal,
    colorForWidth: colorForWidthGlobal,
    colorForHeight: colorForHeightGlobal,
  } = useContext(ExposedViewContext);
  const showUnitEffective = showUnit === undefined ? showUnitGlobal : showUnit;
  const unit = showUnitEffective ? "px" : "";
  const widthPositionEffective = widthPosition ?? widthPositionGlobal;
  const heightPositionEffective = heightPosition ?? heightPositionGlobal;
  const { width, height } = layoutRectangle;
  const widthRounded = Math.round(width);
  const heightRounded = Math.round(height);
  const widthIsExact = width === widthRounded;
  const heightIsExact = height === heightRounded;
  const widthFormatted = `${widthIsExact ? "" : "~"}${widthRounded}${unit}`;
  const heightFormatted = `${heightIsExact ? "" : "~"}${heightRounded}${unit}`;
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
        justifyContent: "center",
        marginVertical: -18,
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
          prefix={prefixForHeightGlobal ?? defaultPrefixes.height}
          value={heightFormatted}
          visible={heightPositionEffective === "left"}
          backgroundColor={colorForHeightGlobal ?? defaultColors.height}
          showArrowsVertical
        />
      </View>
      <View
        style={{
          alignSelf: "stretch",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Label
          prefix={prefixForWidthGlobal ?? defaultPrefixes.width}
          value={widthFormatted}
          visible={widthPositionEffective === "top"}
          backgroundColor={colorForWidthGlobal ?? defaultColors.width}
          showArrowsHorizontal
        />
        <Label
          prefix={prefixForWidthGlobal ?? defaultPrefixes.width}
          value={widthFormatted}
          visible={widthPositionEffective === "bottom"}
          backgroundColor={colorForWidthGlobal ?? defaultColors.width}
          showArrowsHorizontal
        />
      </View>
      <View
        style={{
          position: "absolute",
          right: -100,
          width: 100,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
        }}
      >
        <Label
          prefix={prefixForHeightGlobal ?? defaultPrefixes.height}
          value={heightFormatted}
          visible={heightPositionEffective === "right"}
          backgroundColor={colorForHeightGlobal ?? defaultColors.height}
          showArrowsVertical
        />
      </View>
    </View>
  );
};
