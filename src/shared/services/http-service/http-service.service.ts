import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Topic } from '../../types';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);

  public getTopics(): Observable<Topic[]> {
    return this.http
      .get<Topic[]>(
        `${import.meta.env.NG_APP_API_BASE_URL}/${
          import.meta.env.NG_APP_API_ALL_TOPICS
        }`
      )
      .pipe(map((topics) => [...topics, ...topics])); // TODO: remove duplicate topics [they are just for scroll testing]
  }
}
