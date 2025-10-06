import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { weeklySchedule } from '@/lib/schedule';
import { CheckCircle, Rocket } from 'lucide-react';

export function WeeklySchedule() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              🗓️ Weekly Schedule
            </h2>
            <p className="mx-auto max-w-3xl text-muted-foreground md:text-xl">
              An 8-week journey from fundamentals to full-stack creation.
            </p>
          </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8">
          {weeklySchedule.map((week, index) => (
            <div key={week.id} className="grid gap-1">
                <h3 className="text-xl font-bold sm:text-2xl flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {index + 1}
                  </span>
                  {week.title}
                </h3>
              <div className="pl-16">
                  <ul className="mt-2 space-y-2 text-muted-foreground">
                    {week.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                          <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
