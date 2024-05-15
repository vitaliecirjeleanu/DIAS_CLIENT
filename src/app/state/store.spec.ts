import { TestBed } from '@angular/core/testing';
import { Store, initialState } from './store';
import { State } from './types';
import { MockModule } from 'ng-mocks';
import { HttpClientModule } from '@angular/common/http';
import { LoadStatus, Theme, Topic } from '../../shared/types';
import { of, throwError } from 'rxjs';
import { HttpService } from '../../shared/services/http-service/http-service.service';

const mockTopics: Topic[] = [
  { id: 1, name: 'test1', topics: [] },
  { id: 2, name: 'test2', topics: [] },
];

const mockHttpService = {
  getTopics: jest.fn().mockReturnValue(of(mockTopics)),
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

  test('should have a proper initial state', () => {
    const state: State = {
      loadStatus: store.loadStatus(),
      theme: store.theme(),
      topics: store.topics(),
    };

    expect(state).toEqual(initialState);
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

        expect(store.topics()).toEqual(mockTopics);
        expect(store.loadStatus()).toEqual(LoadStatus.LOADED);
      });

      test(`should not save the topics inside the state and set loadStatus to ${LoadStatus.FAILED} on error`, () => {
        mockHttpService.getTopics.mockReturnValue(throwError(() => 'error'));

        store.loadTopics();

        expect(store.topics()).toEqual([]);
        expect(store.loadStatus()).toEqual(LoadStatus.FAILED);
      });
    });
  });
});
