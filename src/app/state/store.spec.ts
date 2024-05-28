import { TestBed } from '@angular/core/testing';
import { Store, initialState } from './store';
import { State } from './types';
import { MockModule } from 'ng-mocks';
import { HttpClientModule } from '@angular/common/http';
import { LoadStatus, Theme, Topic, TopicVM } from '../../shared/types';
import { of, throwError } from 'rxjs';
import { HttpService } from '../../shared/services/http-service/http-service.service';
import { signal } from '@angular/core';

const mockApiTopics: Topic[] = [
  { id: 1, name: 'test1', topics: [] },
  { id: 2, name: 'test2', topics: [] },
];

const mockStoreTopics: TopicVM[] = [
  { id: 1, name: 'test1', topics: [], nameL18nKey: 'topic.general.test1' },
  { id: 2, name: 'test2', topics: [], nameL18nKey: 'topic.general.test2' },
];

const mockHttpService = {
  getTopics: jest.fn().mockReturnValue(of(mockApiTopics)),
};

describe('Store', () => {
  let store: InstanceType<typeof Store>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(HttpClientModule)],
      providers: [Store, { provide: HttpService, useValue: mockHttpService }],
    });
    store = TestBed.inject(Store);
  });

  describe('actions', () => {
    describe('toggleTheme', () => {
      test('should change the theme', () => {
        store.toggleTheme();

        expect(store.theme()).toEqual(Theme.DARK);
      });
    });

    describe('loadTopics', () => {
      test(`should save the topics inside the state and set loadStatus to ${LoadStatus.LOADED} on success`, () => {
        store.loadTopics();

        expect(store.topics()).toEqual(mockStoreTopics);
        expect(store.loadStatus()).toEqual(LoadStatus.LOADED);
      });

      test(`should not save the topics inside the state and set loadStatus to ${LoadStatus.FAILED} on error`, () => {
        store.topics = signal([]);
        mockHttpService.getTopics.mockReturnValue(throwError(() => 'error'));

        store.loadTopics();

        expect(store.topics()).toEqual([]);
        expect(store.loadStatus()).toEqual(LoadStatus.FAILED);
      });
    });
  });
});
