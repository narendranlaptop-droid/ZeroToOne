import { DiscussionForum } from '@/components/dashboard/discussion/DiscussionForum';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DiscussionPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Discussion Forum
      </h1>
      <p className="text-muted-foreground">
        Share your thoughts and feedback with the community.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>General Discussion</CardTitle>
          <CardDescription>
            This is a place for all members to have a conversation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DiscussionForum />
        </CardContent>
      </Card>
    </div>
  );
}
