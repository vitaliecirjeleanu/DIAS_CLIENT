import { MenuItem } from 'primeng/api';

export type Avatar = {
  imagePath?: string;
  name?: string;
  actions: MenuItem[];
};
