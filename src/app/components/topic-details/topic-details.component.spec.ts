import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailsComponent } from './topic-details.component';
import { MockModule, MockService } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  provideMockActivatedRoute,
  provideMockStore,
} from '../../../utils/tests';

describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;
  const topicName = 'testName';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDetailsComponent, MockModule(TranslateModule)],
      providers: [
        { provide: TranslateService, useValue: MockService(TranslateService) },
        provideMockStore(),
        provideMockActivatedRoute({ snapshot: true, paramMap: true }, [
          { key: 'name', value: topicName },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct name', () => {
    expect(component.topicName).toEqual(topicName);
  });
});
