import * as React from 'react';

import { ExpoLiquidGlassViewProps } from './ExpoLiquidGlass.types';

export default function ExpoLiquidGlassView(props: ExpoLiquidGlassViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
