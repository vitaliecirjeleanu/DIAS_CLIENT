import { Topic, TopicVM } from '../../shared/types';
import { convertToCamelCase } from '../../utils';

export const getTopicsVM = (topics: Topic[]): TopicVM[] =>
  topics.map(
    (topic): TopicVM => ({
      ...topic,
      topics: topic.topics.map((topic) => convertToCamelCase(topic, '_')),
      nameL18nKey: 'topic.general.' + convertToCamelCase(topic.name),
    })
  );
