import { ColorValue, Platform, Text, View } from "react-native";
import React, { useContext } from "react";
import ExposedViewContext from "$/context/ExposedViewContext";
import { defaultFontSize } from "$/config/defaultFontSize";
import { Arrow } from "$/components/Arrow";

export const Label = ({
  prefix,
  value,
  backgroundColor,
  visible = true,
  showArrowsHorizontal = false,
  showArrowsVertical = false,
}: {
  prefix: string;
  value: number | string;
  backgroundColor: ColorValue;
  visible?: boolean;
  showArrowsHorizontal?: boolean;
  showArrowsVertical?: boolean;
}) => {
  const { showPrefix: showPrefixGlobal = true, fontSize: fontSizeGlobal } =
    useContext(ExposedViewContext);
  const isIos = Platform.OS === "ios";
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        alignItems: "center",
      }}
    >
      {visible && showArrowsVertical && <Arrow direction={"up"} />}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {visible && showArrowsHorizontal && <Arrow direction={"left"} />}
        <View
          style={{
            pointerEvents: "none",
            opacity: visible ? 1 : 0,
            borderRadius: 3,
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 2,
            flexDirection: "row",
            display: "flex",
            backgroundColor,
          }}
        >
          {showPrefixGlobal && (
            <Text
              style={{
                fontSize: fontSizeGlobal ?? defaultFontSize,
                paddingHorizontal: 2,
                fontWeight: isIos ? "bold" : "normal",
                fontFamily: isIos ? "Courier New" : "monospace",
              }}
            >
              {prefix}
            </Text>
          )}
          <Text
            style={{
              fontSize: fontSizeGlobal ?? defaultFontSize,
              paddingHorizontal: 2,
              fontWeight: isIos ? "bold" : "normal",
              fontFamily: isIos ? "Courier New" : "monospace",
              backgroundColor: "rgba(255,255,255,0.35)",
            }}
          >
            {value}
          </Text>
        </View>
        {visible && showArrowsHorizontal && <Arrow direction={"right"} />}
      </View>
      {visible && showArrowsVertical && <Arrow direction={"down"} />}
    </View>
  );
};
