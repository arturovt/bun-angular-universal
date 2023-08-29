import {
  ApplicationConfig,
  CSP_NONCE,
  TransferState,
  inject,
  mergeApplicationConfig,
} from '@angular/core';

import { CSP_NONCE_KEY, appConfig } from './app.config';

const browserConfig: ApplicationConfig = {
  providers: [
    {
      provide: CSP_NONCE,
      useFactory: () => inject(TransferState).get(CSP_NONCE_KEY, ''),
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, browserConfig);
