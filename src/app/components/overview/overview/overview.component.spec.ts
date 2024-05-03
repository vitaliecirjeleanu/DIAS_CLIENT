import { ComponentFixture, TestBed } from '@angular/core/testing';
import { bypassLayerError } from '../../../../utils/jsdom-layer-error-bypass';

import { OverviewComponent } from './overview.component';
import { By } from '@angular/platform-browser';
import { CardComponent } from '../../card/card.component';
import { CARDS } from './overview.constants';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  bypassLayerError();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should have the proper number of cards', () => {
    expect(
      fixture.debugElement.queryAll(By.directive(CardComponent)).length
    ).toEqual(CARDS.length);
  });
});
