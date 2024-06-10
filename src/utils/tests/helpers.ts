import { ActivatedRoute } from '@angular/router';
import { Store } from '../../app/state';
import { MockStore } from './mocks';

export const provideMockActivatedRoute = (
  options: any = { snapshot: true, paramMap: true },
  params?: any[]
) => {
  const mockActivatedRoute: any = {};
  if (options.snapshot) {
    mockActivatedRoute['snapshot'] = {};
    if (options.paramMap) {
      const paramMap = new Map();
      params?.forEach(({ key, value }) => paramMap.set(key, value));
      mockActivatedRoute.snapshot = { paramMap };
    }
  }

  return { provide: ActivatedRoute, useValue: mockActivatedRoute };
};

export const provideMockStore = () => ({ provide: Store, useClass: MockStore });
