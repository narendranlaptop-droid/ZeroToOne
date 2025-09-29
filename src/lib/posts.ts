import type { Post } from './types';

export const posts: Post[] = [
  {
    id: 'post-1',
    author: {
      id: 'student-01',
      name: 'Krishna Sai',
      avatar: '/avatars/01.png',
    },
    content:
      'Just finished the Week 1 tasks. The topic on "Dignity of Work" was really insightful! What did everyone else think?',
    timestamp: '2024-08-16T10:00:00Z',
  },
  {
    id: 'post-2',
    author: {
      id: 'admin-01',
      name: 'Admin',
      avatar: '/avatars/admin.png',
    },
    content:
      "Welcome everyone to the discussion forum! Please be respectful and keep the conversations productive. Let's learn together.",
    timestamp: '2024-08-15T09:00:00Z',
  },
  {
    id: 'post-3',
    author: {
      id: 'student-02',
      name: 'Vignesh Nayar',
      avatar: '/avatars/02.png',
    },
    content:
      "I'm a bit stuck on the 'Mapping helps in making sense' topic for Week 2. Can anyone share how they approached it?",
    timestamp: '2024-08-17T14:30:00Z',
  },
];
