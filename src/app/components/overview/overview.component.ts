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
import { LoadStatus } from '../../../shared/types/load.types';

@Component({
  selector: 'overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  imports: [CommonModule, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent implements OnInit {
  private readonly store = inject(Store);

  public readonly topics = this.store.topics;
  public readonly isLoading = computed(
    () => this.store.loadStatus() === LoadStatus.LOADING
  );

  public ngOnInit(): void {
    this.store.loadTopics();
  }
}
