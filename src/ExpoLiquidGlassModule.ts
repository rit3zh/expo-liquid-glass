import { NativeModule, requireNativeModule } from 'expo';

import { ExpoLiquidGlassModuleEvents } from './ExpoLiquidGlass.types';

declare class ExpoLiquidGlassModule extends NativeModule<ExpoLiquidGlassModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoLiquidGlassModule>('ExpoLiquidGlass');
