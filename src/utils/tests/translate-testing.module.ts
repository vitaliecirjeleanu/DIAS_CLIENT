import {
  EventEmitter,
  Injectable,
  NgModule,
  Pipe,
  PipeTransform,
} from '@angular/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of({});
  }
}

@Pipe({
  name: 'translate',
})
export class TranslatePipeMock implements PipeTransform {
  public name = 'translate';

  public transform(query: string, ...args: any[]): any {
    return query;
  }
}

@Injectable()
export class TranslateServiceMock {
  public get<T>(key: T): Observable<T> {
    return of(key);
  }

  public instant<T>(key: T): T {
    return key;
  }

  public addLangs(langs: string[]) {}

  public setDefaultLang(lang: string) {}

  public getBrowserLang(): string {
    return 'en';
  }

  public use(lang: string) {}

  public onLangChange: EventEmitter<any> = new EventEmitter();
  public onTranslationChange: EventEmitter<any> = new EventEmitter();
  public onDefaultLangChange: EventEmitter<any> = new EventEmitter();
}

@NgModule({
  declarations: [TranslatePipeMock],
  providers: [
    {
      provide: TranslateService,
      useClass: TranslateServiceMock,
    },
    {
      provide: TranslatePipe,
      useClass: TranslatePipeMock,
    },
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: FakeLoader,
      },
    }),
  ],
  exports: [TranslatePipeMock],
})
export class TranslateTestingModule {}
