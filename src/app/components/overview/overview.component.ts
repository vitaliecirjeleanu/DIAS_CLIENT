import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Store } from '../../state';
import { LoadStatus } from '../../../shared/types';
import { PrimengCommonModule } from '../../../shared/modules/primeng-common.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  imports: [CommonModule, CardComponent, PrimengCommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  private readonly store = inject(Store);

  public readonly topics = this.store.topics;
  public readonly isLoading = computed(
    () => this.store.loadStatus() === LoadStatus.LOADING
  );
}
