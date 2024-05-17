import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { Store } from '../../state';
import { LoadStatus, Topic } from '../../../shared/types';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  imports: [CommonModule, TranslateModule, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {
  private readonly store = inject(Store);

  public readonly topics = computed(() => this.getTopicsWithTranslationKeys());
  public readonly isLoading = computed(
    () => this.store.loadStatus() === LoadStatus.LOADING
  );

  public ngOnInit(): void {
    this.store.loadTopics();
  }

  private getTopicsWithTranslationKeys(): Topic[] {
    return this.store.topics().map(
      (topic): Topic => ({
        ...topic,
        name:
          'topics.' +
          topic.name
            .split(' ')
            .map((name, idx) =>
              idx === 0 ? name : name[0].toUpperCase() + name.slice(1)
            )
            .join(''),
      })
    );
  }
}
