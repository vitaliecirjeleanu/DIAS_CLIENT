import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardComponent } from '../../card/card.component';
import { map } from 'rxjs';
import { Card } from '../../../../shared/types';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  imports: [CommonModule, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  private readonly http = inject(HttpClient);

  public cardsVM$ = this.http
    .get<Card[]>(
      `${import.meta.env.NG_APP_API_BASE_URL}/${
        import.meta.env.NG_APP_API_ALL_TOPICS
      }`
    )
    .pipe(map((topics) => [...topics, ...topics])); // TODO: remove duplicate topics [they are just for scroll testing]
}
