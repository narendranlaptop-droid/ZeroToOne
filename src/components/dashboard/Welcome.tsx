export function Welcome({ name }: { name: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Welcome back, {name}!
      </h1>
      <p className="text-muted-foreground">
        Here's what's happening with your account today.
      </p>
    </div>
  );
}
