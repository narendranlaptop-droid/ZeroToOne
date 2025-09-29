'use client';

import { useState } from 'react';
import { PostForm } from './PostForm';
import { PostList } from './PostList';
import { posts as initialPosts } from '@/lib/posts';
import type { Post } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';

export function DiscussionForum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (content: string) => {
    if (!user) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        id: user.id,
        name: user.name,
        avatar: `/avatars/${user.id.split('-')[1] || 'default'}.png`, // Basic avatar logic
      },
      content,
      timestamp: new Date().toISOString(),
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="space-y-6">
      <PostForm onAddPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
}
