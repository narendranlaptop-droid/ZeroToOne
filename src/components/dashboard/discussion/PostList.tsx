import type { Post } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="p-4 flex gap-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{post.author.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(post.timestamp), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-sm text-foreground mt-1">{post.content}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
