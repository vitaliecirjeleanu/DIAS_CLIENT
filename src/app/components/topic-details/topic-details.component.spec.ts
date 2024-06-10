import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailsComponent } from './topic-details.component';
import { MockModule, MockService } from 'ng-mocks';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { signal } from '@angular/core';
import { Store } from '../../state';
import { provideMockActivatedRoute } from '../../../utils/tests';

class MockStore {
  topics = signal([]);
}

const topicName = 'testName';

describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDetailsComponent, MockModule(TranslateModule)],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: TranslateService, useValue: MockService(TranslateService) },
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
