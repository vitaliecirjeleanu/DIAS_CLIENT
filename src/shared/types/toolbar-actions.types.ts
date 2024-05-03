import { PrimeIcons } from 'primeng/api';

export type ToolbarAction = {
  callback: () => void;
  icon: PrimeIcons;
  label: string;
};
