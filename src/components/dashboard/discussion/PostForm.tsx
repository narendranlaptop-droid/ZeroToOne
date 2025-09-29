'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PostFormProps {
  onAddPost: (content: string) => void;
}

export function PostForm({ onAddPost }: PostFormProps) {
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && user) {
      onAddPost(content);
      setContent('');
      toast({
        title: 'Post Submitted',
        description: 'Your message has been added to the discussion.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your message here..."
        className="min-h-[100px]"
        disabled={!user}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={!content.trim() || !user}>
          Post
        </Button>
      </div>
    </form>
  );
}
