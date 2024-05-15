import { signalStore, withMethods, withState } from '@ngrx/signals';
import { State } from './types';
import { inject } from '@angular/core';
import { HttpService } from '../../shared/services/http-service/http-service.service';
import { loadTopics, toggleTheme } from './actions';
import { LoadStatus, Theme } from '../../shared/types';

const initialState: State = {
  loadStatus: LoadStatus.NOT_LOADED,
  theme: Theme.LIGHT,
  topics: [],
};

export const Store = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, httpService = inject(HttpService)) => ({
    toggleTheme: toggleTheme(store),
    loadTopics: loadTopics(store, httpService),
  }))
);
