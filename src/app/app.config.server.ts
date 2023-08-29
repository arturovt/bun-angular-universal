import {
  mergeApplicationConfig,
  ApplicationConfig,
  NgZone,
  ɵNoopNgZone,
  ApplicationRef,
  Injectable,
  inject,
  ɵInitialRenderPendingTasks,
  APP_BOOTSTRAP_LISTENER,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { BehaviorSubject, Observable, filter, map, mergeMap } from 'rxjs';

import { appConfig } from './app.config';

@Injectable({ providedIn: 'root' })
export class AppBootstrapped extends BehaviorSubject<boolean> {
  constructor() {
    super(false);
  }
}

@Injectable()
export class NoopNgZoneApplicationRef extends ApplicationRef {
  override isStable: Observable<boolean>;

  constructor() {
    super();

    const pendingTasks = inject(ɵInitialRenderPendingTasks);

    this.isStable = inject(AppBootstrapped).pipe(
      filter(appBootstrapped => appBootstrapped),
      mergeMap(() => pendingTasks.hasPendingTasks),
      map(hasPendingTasks => !hasPendingTasks)
    );
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: NgZone, useClass: ɵNoopNgZone },
    { provide: ApplicationRef, useClass: NoopNgZoneApplicationRef },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: () => {
        const appBootstrapped = inject(AppBootstrapped);
        return () => appBootstrapped.next(true);
      },
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
