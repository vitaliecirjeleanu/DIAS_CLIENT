import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { By } from '@angular/platform-browser';
import { bypassLayerError } from '../../../utils/jsdom-layer-error-bypass';
import { CardComponent } from '../card/card.component';
import { signal } from '@angular/core';
import { LoadStatus, TopicVM } from '../../../shared/types';
import { Store } from '../../state';
import { MockComponent, MockModule } from 'ng-mocks';
import { TranslateModule } from '@ngx-translate/core';

const mockTopics: TopicVM[] = [
  { id: 1, name: 'test1', topics: [], nameL18nKey: '' },
  { id: 2, name: 'test2', topics: [], nameL18nKey: '' },
];

class MockStore {
  loadStatus = signal(LoadStatus.LOADED);
  topics = signal(mockTopics);
  loadTopics = jest.fn();
}

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  bypassLayerError();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OverviewComponent,
        MockComponent(CardComponent),
        MockModule(TranslateModule),
      ],
      providers: [{ provide: Store, useClass: MockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should have the proper number of cards', () => {
    expect(
      fixture.debugElement.queryAll(By.directive(CardComponent)).length
    ).toEqual(mockTopics.length);
  });
});
