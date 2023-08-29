import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, makeStateKey } from '@angular/core';

export const CSP_NONCE_KEY = makeStateKey<string>('cspNonce');

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};
