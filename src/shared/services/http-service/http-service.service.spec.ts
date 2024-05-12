import { TestBed } from '@angular/core/testing';

import { HttpService } from './http-service.service';
import { MockModule, MockService } from 'ng-mocks';
import { HttpClientModule } from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(HttpClientModule)],
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
