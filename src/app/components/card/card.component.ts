import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';

import { CardModule } from 'primeng/card';
import { PrimengCommonModule } from '../../../shared/modules/primeng-common.module';
import { KeyboardCode, TopicVM } from '../../../shared/types';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CardModule, PrimengCommonModule, TranslateModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
  @Input() public topic!: TopicVM;

  @HostBinding('attr.tabindex') public tabIndex = '0';
  @HostBinding('attr.role') public role = 'button';

  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (
      [KeyboardCode.Space, KeyboardCode.Enter].includes(
        event.code as KeyboardCode
      )
    ) {
      this.navigateToRoute();
    }
  }

  @HostListener('click')
  public onClick(): void {
    this.navigateToRoute();
  }

  private readonly router = inject(Router);

  private navigateToRoute(): void {
    this.router.navigate([
      'topic',
      this.topic.name.split(' ').join('').toLowerCase(),
    ]);
  }
}
