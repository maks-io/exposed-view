import { LayoutRectangle, useWindowDimensions, View } from "react-native";
import { whoAmINow } from "who-am-i-now";
import { ExposedViewProps } from "$/types/ExposedViewProps";
import { checkStyle } from "$/helpers/checkStyle";
import { useContext, useEffect, useRef, useState } from "react";
import ExposedViewContext from "$/context/ExposedViewContext";
import { Dimensions } from "$/components/Dimensions";
import { Position } from "$/components/Position";
import { defaultBackgroundOpacity } from "$/config/defaultBackgroundOpacity";
import { defaultBorderWidth } from "$/config/defaultBorderWidth";

export const EnhancedView = ({
  children,
  color,
  expose,
  showWarnings = false,
  showDimensions,
  showPosition,
  widthPosition = "bottom",
  heightPosition = "right",
  showUnit,
  style = {},
  ...rest
}: ExposedViewProps) => {
  const windowDimensions = useWindowDimensions();
  const {
    exposeGlobal,
    exposeOverride,
    showWarnings: showWarningsGlobal,
    showDimensions: showDimensionsGlobal,
    showPosition: showPositionGlobal,
    backgroundOpacity: backgroundOpacityGlobal,
    borderWidth: borderWidthGlobal,
  } = useContext(ExposedViewContext);

  const viewRef = useRef<View>(null);
  const [layoutRectangle, setLayoutRectangle] = useState<LayoutRectangle>();
  const [measureInWindow, setMeasureInWindow] = useState<LayoutRectangle>();

  const exposeEffective =
    exposeOverride !== undefined
      ? exposeOverride
      : expose !== undefined
        ? expose
        : exposeGlobal;
  const showDimensionsEffective =
    showDimensions === undefined ? showDimensionsGlobal : showDimensions;
  const showPositionEffective =
    showPosition === undefined ? showPositionGlobal : showPosition;

  useEffect(() => {
    if (exposeEffective && showPositionEffective && viewRef?.current) {
      viewRef.current.measureInWindow((x, y, width, height) => {
        setMeasureInWindow({ x, y, width, height });
      });
    }
  }, [
    exposeEffective,
    showPositionEffective,
    windowDimensions?.height,
    windowDimensions?.width,
    viewRef?.current,
    layoutRectangle,
  ]);

  const showWarningsEffective =
    showWarnings !== undefined ? showWarnings : showWarningsGlobal;

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
        ref={viewRef}
        onLayout={
          showDimensionsEffective || showPositionEffective
            ? ({ nativeEvent: { layout } }) => {
                setLayoutRectangle(layout);
              }
            : undefined
        }
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderColor: style?.borderColor ? undefined : color,
          borderStyle: style?.borderStyle
            ? undefined
            : color
              ? "solid"
              : undefined,
          borderWidth: style?.borderWidth
            ? undefined
            : color
              ? borderWidthGlobal ?? defaultBorderWidth
              : undefined,
          backgroundColor: style?.backgroundColor ? undefined : color,
        }}
      >
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: backgroundOpacityGlobal ?? defaultBackgroundOpacity,
            backgroundColor: "white",
          }}
        />
      </View>
      {children}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        {showDimensionsEffective && layoutRectangle && (
          <Dimensions
            layoutRectangle={layoutRectangle}
            showUnit={showUnit}
            widthPosition={widthPosition}
            heightPosition={heightPosition}
          />
        )}
        {showPositionEffective && measureInWindow && (
          <Position layoutRectangle={measureInWindow} showUnit={showUnit} />
        )}
      </View>
    </View>
  );
};

const activateLibrary =
  process.env.EXPOSE_VIEW === "true" ||
  process.env.EXPO_PUBLIC_EXPOSE_VIEW === "true" ||
  whoAmINow().isExpoSnack;

export const ExposedView = activateLibrary ? EnhancedView : View;
