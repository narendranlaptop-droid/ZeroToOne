import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Objective() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex justify-center">
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold font-headline">Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground md:text-lg">
                “The main objective of this program is to engage students into
                self-learning. The motive of this program is the students will
                learn perfectly if we give enough amount of time and space.”
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
