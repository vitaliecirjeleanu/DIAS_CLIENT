import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewComponent } from './overview.component';
import { By } from '@angular/platform-browser';
import { bypassLayerError } from '../../../utils/jsdom-layer-error-bypass';
import { CardComponent } from '../card/card.component';
import { MockComponent } from 'ng-mocks';
import { provideMockStore } from '../../../utils/tests/helpers';
import { mockTopics } from '../../../utils/tests/mocks';
import { TranslateTestingModule } from '../../../utils/tests';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { LoadStatus } from '../../../shared/types';
import { ProgressSpinner } from 'primeng/progressspinner';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  bypassLayerError();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OverviewComponent,
        MockComponent(CardComponent),
        TranslateTestingModule,
      ],
      providers: [provideMockStore()],
    })
      .overrideComponent(OverviewComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should display progress spinner when loading', () => {
    (component.isLoading as any) = signal(LoadStatus.LOADING);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.directive(ProgressSpinner))
    ).toBeTruthy();
  });

  test('should have the proper number of cards', () => {
    expect(
      fixture.debugElement.queryAll(By.directive(CardComponent)).length
    ).toEqual(mockTopics.length);
  });
});
