import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailsComponent } from './topic-details.component';
import {
  TranslateTestingModule,
  provideMockActivatedRoute,
  provideMockStore,
} from '../../../utils/tests';
import { mockTopics } from '../../../utils/tests/mocks';
import { bypassLayerError } from '../../../utils';
import { ChangeDetectionStrategy, signal } from '@angular/core';

describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;
  const topicName = 'test1';

  bypassLayerError();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDetailsComponent, TranslateTestingModule],
      providers: [
        provideMockStore(),
        provideMockActivatedRoute({ snapshot: true, paramMap: true }, [
          { key: 'name', value: topicName },
        ]),
      ],
    })
      .overrideComponent(TopicDetailsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should have the correct name', () => {
    expect(component.topicName).toEqual(topicName);
  });

  test('should have the proper topics', () => {
    expect(component.topics()).toEqual(mockTopics[0].topics);
  });

  test('should display a message when it has no topics', () => {
    component.topics = signal([]);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('[data-test-name="emptyMessage"]')
    ).toBeTruthy();
  });

  describe('topics', () => {
    test('should be displayed if it has topics', () => {
      const topics = fixture.nativeElement.querySelectorAll(
        '[data-test-name="topicItem"]'
      );
      expect(topics.length).toEqual(mockTopics[0].topics.length);
    });

    test('should not be displayed if it has no topics', () => {
      component.topics = signal([]);

      fixture.detectChanges();
      const topics = fixture.nativeElement.querySelectorAll(
        '[data-test-name="topicItem"]'
      );

      expect(topics.length).toEqual(0);
    });
  });
});
