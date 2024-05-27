export type Topic = {
  id: number;
  name: string;
  topics: string[];
};

export type TopicVM = Topic & { nameL18nKey: string };
