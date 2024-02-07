import { inject, InjectionToken, Provider } from '@angular/core';
import { AppConfig } from '@app/interface';
import { Config } from '@shared/config/config';

type ConfigKeys = keyof AppConfig;
type ConfigTypeForKey<T extends ConfigKeys> = Readonly<AppConfig[T]>;

export const APP_CONFIG = new InjectionToken<AppConfig>('App config');

export function provideAppConfig(): Provider {
  return { provide: APP_CONFIG, useValue: Config };
}

export function getConfig<T extends ConfigKeys>(key: T): ConfigTypeForKey<T> {
  const config = inject(APP_CONFIG);

  return config[key];
}
