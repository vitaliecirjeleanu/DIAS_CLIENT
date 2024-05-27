import { LoadStatus, Theme, TopicVM } from '../../shared/types';

export type State = {
  loadStatus: LoadStatus;
  theme: Theme;
  topics: TopicVM[];
};
