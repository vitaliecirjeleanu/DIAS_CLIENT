import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Topic } from '../../types';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/envinronment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly http = inject(HttpClient);

  public getTopics(): Observable<Topic[]> {
    return this.http
      .get<Topic[]>(
        `${environment.api.baseUrl}/${environment.api.endpoints.topics}`
      )
      .pipe(map((topics) => [...topics, ...topics])); // TODO: remove duplicate topics [they are just for scroll testing]
  }
}
