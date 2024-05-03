import { Injectable, Signal, signal } from '@angular/core';
import { Theme } from '../../types/theme.types';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme = signal(Theme.LIGHT);

  public get theme(): Signal<Theme> {
    return this._theme.asReadonly();
  }

  public toggleTheme(): void {
    const newTheme = this._theme() === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this._theme.set(newTheme);
    (
      document.getElementById('app-theme') as HTMLLinkElement
    ).href = `${newTheme}.css`;
  }
}
