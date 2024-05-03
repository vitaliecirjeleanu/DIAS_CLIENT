import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CARDS } from './overview.constants';
import { CardComponent } from '../../card/card.component';

@Component({
  selector: 'overview',
  standalone: true,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  public cards = CARDS;
}
