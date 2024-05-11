import { LoadStatus, Topic } from '../../shared/types';

export type State = {
  loadStatus: LoadStatus;
  topics: Topic[];
};
