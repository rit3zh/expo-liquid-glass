import { requireNativeView } from "expo";
import * as React from "react";
import type { ExpoLiquidGlassViewProps } from "./ExpoLiquidGlassView.types";

const NativeView: React.ComponentType<ExpoLiquidGlassViewProps> =
  requireNativeView("ExpoLiquidGlass", "ExpoLiquidGlassView");

export function ExpoLiquidGlassView(props: ExpoLiquidGlassViewProps) {
  return (
    <NativeView
      {...props}
      style={
        props.style ?? {
          width: 200,
          height: 200,
        }
      }
    />
  );
}
