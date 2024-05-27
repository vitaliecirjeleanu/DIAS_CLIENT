import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CarouselModule } from 'primeng/carousel';

import { Store } from '../../state';
import { PrimengCommonModule } from '../../../shared/modules/primeng-common.module';
import { TranslateModule } from '@ngx-translate/core';
import { CAROUSEL_RESPONSIVE_OPTIONS } from './topic-details.constants';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-topic-details',
  standalone: true,
  imports: [PrimengCommonModule, CarouselModule, TranslateModule],
  templateUrl: './topic-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicDetailsComponent {
  public readonly RESPONSIVE_OPTIONS = CAROUSEL_RESPONSIVE_OPTIONS;
  public readonly imagesEndpoint = process.env.NG_APP_API_IMAGES;
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  public topicName = this.route.snapshot.paramMap.get('name');

  public topics = computed(() => {
    return (
      this.store
        .topics()
        .find(({ name }) => name.replaceAll(' ', '') === this.topicName)
        ?.topics ?? []
    );
  });
}
