import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollTopModule } from 'primeng/scrolltop';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TRANSLATION_CONFIG } from './translation-module.config';
import { provideAppInitializer } from './app.providers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FooterComponent,
    ScrollTopModule,
    ToolbarComponent,
    TranslateModule.forRoot(TRANSLATION_CONFIG),
  ],
  providers: [provideAppInitializer(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
