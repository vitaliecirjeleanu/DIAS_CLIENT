import { StateSignal, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { State } from './types';
import { HttpService } from '../../shared/services/http-service/http-service.service';
import { LoadStatus } from '../../shared/types/load.types';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

export const loadTopics = (store: StateSignal<State>, service: HttpService) =>
  rxMethod<void>(
    pipe(
      tap(() => patchState(store, { loadStatus: LoadStatus.LOADING })),
      switchMap(() => {
        return service.getTopics().pipe(
          tapResponse({
            next: (topics) =>
              patchState(store, { topics, loadStatus: LoadStatus.LOADED }),
            error: (err) => {
              patchState(store, { loadStatus: LoadStatus.FAILED });
              console.error(err);
            },
          })
        );
      })
    )
  );
