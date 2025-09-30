import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Objective() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex justify-center">
          <Card className="max-w-3xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">Objective</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground md:text-lg">
                "Our primary objective is to cultivate self-directed learning by providing students with the time and space required to achieve a comprehensive understanding of the subject matter."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
