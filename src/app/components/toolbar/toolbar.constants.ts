import { MenuItem, PrimeIcons } from 'primeng/api';
import { ToolbarAction } from '../../../shared/types';

export const AVATAR_DEFAULT_ACTIONS: MenuItem[] = [
  {
    label: 'Settings',
  },
  {
    label: 'Sign out',
  },
];

export const TOOLBAR_DEFAULT_ACTIONS: ToolbarAction[] = [
  {
    label: 'Home',
    icon: PrimeIcons.HOME,
  },
  {
    label: 'Search',
    icon: PrimeIcons.SEARCH,
  },
];
