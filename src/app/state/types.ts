import { Topic } from '../../shared/types';
import { LoadStatus } from '../../shared/types/load.types';

export type State = {
  loadStatus: LoadStatus;
  topics: Topic[];
};
