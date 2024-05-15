import { LoadStatus, Theme, Topic } from '../../shared/types';

export type State = {
  loadStatus: LoadStatus;
  theme: Theme;
  topics: Topic[];
};
