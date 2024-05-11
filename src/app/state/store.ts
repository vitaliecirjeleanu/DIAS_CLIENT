import { signalStore, withMethods, withState } from '@ngrx/signals';
import { State } from './types';
import { inject } from '@angular/core';
import { HttpService } from '../../shared/services/http-service/http-service.service';
import { loadTopics } from './actions';
import { LoadStatus } from '../../shared/types';

const initialState: State = {
  loadStatus: LoadStatus.NOT_LOADED,
  topics: [],
};

export const Store = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, httpService = inject(HttpService)) => ({
    loadTopics: loadTopics(store, httpService),
  }))
);
