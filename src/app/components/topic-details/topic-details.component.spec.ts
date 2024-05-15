import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDetailsComponent } from './topic-details.component';
import { ActivatedRoute } from '@angular/router';

const topicName = 'testName';

const mockActivatedRoute = {
  snapshot: {
    paramMap: new Map().set('name', topicName),
  },
};

describe('TopicDetailsComponent', () => {
  let component: TopicDetailsComponent;
  let fixture: ComponentFixture<TopicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDetailsComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the correct name', () => {
    expect(component.topicName).toEqual(topicName);
  });
});
