export type Week = {
  id: string;
  title: string;
  topics: string[];
};

export const weeklySchedule: Week[] = [
  {
    id: 'week-1',
    title: 'Week 1: Foundation & Mindset',
    topics: [
      'Introduction',
      'Link Collection',
      'Dignity of Work',
      'Prompt your way to wisdom',
      'Give Purpose to your journey',
    ],
  },
  {
    id: 'week-2',
    title: 'Week 2: Awareness & Exploration',
    topics: [
      'What’s all this fuss about AI?',
      'Look Within',
      'You are a super-human if you have the skill to listen',
      'Mapping helps in making sense',
    ],
  },
  {
    id: 'week-3',
    title: 'Week 3: Thinking & Hypotheses',
    topics: [
      'Everything is a Hypothesis',
      'Be on the same page',
      'Go slow to go fast',
      'Remember to ask questions',
    ],
  },
  {
    id: 'week-4',
    title: 'Week 4: Problem-Solving Tools',
    topics: [
      'Nothing makes sense till you know the BPF (Business Process Flow)',
      'Version Controlling',
      'The V1s are supposed to suck',
      'Shooting blind Vs Doing pDNA',
    ],
  },
  {
    id: 'week-5',
    title: 'Week 5: Data Journey',
    topics: ['No Data → Create It', 'EDA', 'SQL', 'PowerBI is not a skill'],
  },
  {
    id: 'week-6',
    title: 'Week 6: Quality & Mind Mapping',
    topics: ['Importance of Quality', 'Mind Maps are not static', 'Business model'],
  },
  {
    id: 'week-7',
    title: 'Week 7: Technical Core',
    topics: ['Python with JSON', 'UI and UX'],
  },
  {
    id: 'week-8',
    title: 'Week 8: Advanced & Capstone',
    topics: ['Predictive Modeling', 'Full Stack Project'],
  },
];
