import { signal } from '@angular/core';
import { LoadStatus, Theme, TopicVM } from '../../../shared/types';

export const mockTopics: TopicVM[] = [
  { id: 1, name: 'test1', topics: [], nameL18nKey: '' },
  { id: 2, name: 'test2', topics: [], nameL18nKey: '' },
];

export class MockStore {
  loadStatus = signal(LoadStatus.LOADED);
  theme = signal(Theme.LIGHT);
  topics = signal(mockTopics);
  loadTopics = jest.fn();
  toggleTheme = jest.fn();
}
