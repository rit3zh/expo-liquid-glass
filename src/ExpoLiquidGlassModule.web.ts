import { registerWebModule, NativeModule } from 'expo';

import { ExpoLiquidGlassModuleEvents } from './ExpoLiquidGlass.types';

class ExpoLiquidGlassModule extends NativeModule<ExpoLiquidGlassModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoLiquidGlassModule, 'ExpoLiquidGlassModule');
