import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [ButtonModule, RippleModule, ProgressSpinnerModule],
  exports: [ButtonModule, RippleModule, ProgressSpinnerModule],
})
export class PrimengCommonModule {}
