import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { weeklySchedule } from '@/lib/schedule';

export function WeeklySchedule() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
          Weekly Schedule (8 weeks)
        </h2>
        <div className="mx-auto max-w-3xl mt-8">
          <Accordion type="single" collapsible className="w-full">
            {weeklySchedule.map((week) => (
              <AccordionItem value={week.id} key={week.id}>
                <AccordionTrigger className="text-lg font-semibold">
                  {week.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-4 list-disc">
                    {week.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
