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
import { ThemeService } from '../../../shared/services/theme-service/theme.service';
import { CommonModule } from '@angular/common';
import { AVATAR_DEFAULT_ACTIONS } from './toolbar.constants';
import { Theme, ToolbarAction } from '../../../shared/types';
import { PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';

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

  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  public theme = this.themeService.theme;

  public toggleTheme(): void {
    this.themeService.toggleTheme();
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
