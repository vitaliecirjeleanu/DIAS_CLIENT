import { APP_INITIALIZER, Provider } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

export function appInitializerFactory(translate: TranslateService) {
  return () => lastValueFrom(translate.use('en'));
}

export function provideAppInitializer(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFactory,
    deps: [TranslateService],
    multi: true,
  };
}
