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
import {
  AVATAR_DEFAULT_ACTIONS,
  TOOLBAR_DEFAULT_ACTIONS,
} from './toolbar.constants';
import { Theme } from '../../../shared/types';
import { PrimeIcons } from 'primeng/api';

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

  public toolbarActions = TOOLBAR_DEFAULT_ACTIONS;

  private themeService = inject(ThemeService);
  public theme = this.themeService.theme;

  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
