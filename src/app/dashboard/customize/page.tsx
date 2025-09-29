import { CustomizeUI } from '@/components/dashboard/CustomizeUI';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function CustomizeUIPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        UI Customization
      </h1>
      <p className="text-muted-foreground">
        Use the GenAI-powered tool to change the application's theme.
      </p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Theme Generator</CardTitle>
          <CardDescription>
            Enter your branding details and let AI generate a new theme for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomizeUI />
        </CardContent>
      </Card>
    </div>
  );
}
