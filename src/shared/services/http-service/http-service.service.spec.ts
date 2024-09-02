import { TestBed } from '@angular/core/testing';

import { HttpService } from './http-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {} from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
