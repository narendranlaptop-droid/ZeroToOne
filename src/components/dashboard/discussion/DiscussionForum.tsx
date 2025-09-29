'use client';

import { useState } from 'react';
import { PostForm } from './PostForm';
import { PostList } from './PostList';
import { posts as initialPosts } from '@/lib/posts';
import type { Post } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export function DiscussionForum() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const { toast } = useToast();

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

  const removePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    toast({
        variant: 'destructive',
        title: 'Post Removed',
        description: `The post has been permanently removed.`,
    });
  };

  return (
    <div className="space-y-6">
      <PostForm onAddPost={addPost} />
      <PostList posts={posts} onRemovePost={removePost} />
    </div>
  );
}
