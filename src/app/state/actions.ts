import { StateSignal, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { State } from './types';
import { HttpService } from '../../shared/services/http-service/http-service.service';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { LoadStatus, Theme } from '../../shared/types';
import { getTopicsVM } from './utils';

export const toggleTheme = (store: StateSignal<State>) => () =>
  patchState(store, (state) => ({
    theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
  }));

export const loadTopics = (store: StateSignal<State>, service: HttpService) =>
  rxMethod<void>(
    pipe(
      tap(() => patchState(store, { loadStatus: LoadStatus.LOADING })),
      switchMap(() => {
        return service.getTopics().pipe(
          tapResponse({
            next: (topics) =>
              patchState(store, {
                topics: getTopicsVM(topics).sort((a, b) => a.id - b.id),
                loadStatus: LoadStatus.LOADED,
              }),
            error: () => {
              patchState(store, { loadStatus: LoadStatus.FAILED });
            },
          })
        );
      })
    )
  );
