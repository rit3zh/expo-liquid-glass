import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoLiquidGlassViewProps } from './ExpoLiquidGlass.types';

const NativeView: React.ComponentType<ExpoLiquidGlassViewProps> =
  requireNativeView('ExpoLiquidGlass');

export default function ExpoLiquidGlassView(props: ExpoLiquidGlassViewProps) {
  return <NativeView {...props} />;
}
