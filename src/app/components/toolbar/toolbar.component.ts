import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { PrimengCommonModule } from '../../../shared/modules/primeng-common.module';
import { Avatar } from '../../../shared/types/avatar.types';
import { CommonModule } from '@angular/common';
import { AVATAR_DEFAULT_ACTIONS } from './toolbar.constants';
import { Theme, ToolbarAction } from '../../../shared/types';
import { PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';
import { Store } from '../../state';

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [ToolbarModule, MenuModule, PrimengCommonModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent {
  public readonly THEME_OPTIONS = Theme;
  public readonly PRIME_ICONS = PrimeIcons;

  public avatar: Avatar = {
    name: 'User Name',
    actions: AVATAR_DEFAULT_ACTIONS, // here will be a check to add custom actions
  };

  public toolbarActions = this.getToolbarActions();

  private readonly store = inject(Store);
  private readonly router = inject(Router);

  public theme = this.store.theme;

  public toggleTheme(): void {
    this.store.toggleTheme();

    (
      document.getElementById('app-theme') as HTMLLinkElement
    ).href = `${this.store.theme()}.css`;
  }

  private getToolbarActions(): ToolbarAction[] {
    const home: ToolbarAction = {
      label: 'Home',
      icon: PrimeIcons.HOME,
      callback: () => {
        this.router.navigate(['overview']);
      },
    };

    const search: ToolbarAction = {
      label: 'Search',
      icon: PrimeIcons.SEARCH,
      callback: () => console.log('Search'),
    };

    return [home, search];
  }
}
