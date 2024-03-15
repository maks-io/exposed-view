import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
import React from "react";

interface ArrowProps {
  direction: "left" | "right" | "up" | "down";
}

const arrowSize = 12;

export const Arrow = ({ direction }: ArrowProps) => {
  const deg =
    direction === "left"
      ? 0
      : direction === "up"
        ? 90
        : direction === "right"
          ? 180
          : 270;
  return (
    <View
      style={{
        height: arrowSize,
        width: arrowSize,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        transform:
          direction === "up"
            ? "translateY(2px)"
            : direction === "down"
              ? "translateY(-2px)"
              : undefined,
      }}
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          transform: `rotate(${deg}deg)`,
        }}
      >
        <Svg viewBox="0 0 32 32">
          <Path
            d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
            data-name="4-Arrow Left"
            strokeWidth="3"
            stroke="black"
          />
        </Svg>
      </View>
    </View>
  );
};
