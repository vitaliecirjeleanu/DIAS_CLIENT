import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { Theme } from '../../types';
import { signal } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    const mockThemeElement = document.createElement('div');
    mockThemeElement.id = 'app-theme';
    document.body.appendChild(mockThemeElement);
    service = TestBed.inject(ThemeService);
  });

  describe('toggle theme method', () => {
    test('should set theme to dark when it is light', () => {
      service.toggleTheme();
      expect(service.theme()).toEqual(Theme.DARK);
    });

    test('should set theme to light when it is dark', () => {
      service['_theme'] = signal(Theme.DARK);

      service.toggleTheme();

      expect(service.theme()).toEqual(Theme.LIGHT);
    });
  });
});
