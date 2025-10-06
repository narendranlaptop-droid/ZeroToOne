import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Target, Microscope, Puzzle, CheckCircle, Rocket } from 'lucide-react';

export function ProgramPlaybook() {
  const principles = [
    'Go slow to go fast — true mastery takes time and patience.',
    'Everything is a hypothesis — question everything until it makes sense.',
    'Create your own data — when none exists, make your own.',
    'Never make a mind map static — because learning is always evolving.',
    'Version control your growth — your first version will suck, but that’s progress.',
  ];

  const themes = [
    'Dignity of Work',
    'Prompt Your Way to Wisdom',
    'Give Purpose to Your Journey',
    'What’s All This Fuss About AI?',
    'Look Within',
    'You Are a Superhuman (If You Listen)',
    'Mapping Helps in Making Sense',
    'Everything Is a Hypothesis',
    'Ask Questions Relentlessly',
    'Know the BPF (Big Picture First)',
    'Go Slow to Go Fast',
    'Embrace V1s',
    'Data Thinking',
    'Full-Stack Learning',
  ];

  const sectionData = [
    {
      icon: <Compass className="h-8 w-8 text-primary" />,
      title: 'What is Zero to One?',
      content: [
        'Zero to One is a learning journey designed by Prafulla that helps students move from passive learners to powerful doers.',
        'The goal isn’t to teach but to create space — space to explore, question, build, and fail safely — because true learning happens not when you’re taught, but when you discover.',
      ],
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Why This Program Exists',
      content: [
        'In today’s fast-paced world, knowledge is everywhere — but understanding is rare.',
        'Zero to One exists to slow down the process, to help learners think deeply, connect dots, and grow in a way that feels authentic and sustainable.',
        'It’s not about finishing lessons — it’s about becoming someone who learns for life.',
      ],
    },
    {
      icon: <Microscope className="h-8 w-8 text-primary" />,
      title: 'How the Program Works',
      content: [
        'Over two months, students explore foundational themes that shape both mindset and skillset. The experience blends reflection, problem-solving, and hands-on creation — helping you evolve from knowing things to building things.',
      ],
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-5xl space-y-16">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              🌱 Zero to One — The Program Playbook
            </h2>
            <p className="text-muted-foreground md:text-xl">
              A journey from passive learning to powerful doing.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
             {sectionData.map((section, index) => (
                <Card key={index} className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <CardHeader className="flex flex-row items-center gap-4">
                        {section.icon}
                        <CardTitle className="text-2xl font-semibold">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4 text-muted-foreground">
                        {section.content.map((p, i) => <p key={i}>{p}</p>)}
                    </CardContent>
                </Card>
             ))}
          </div>

          <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-4">
                    <Rocket className="h-8 w-8 text-primary"/>
                    Key Principles of the Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  {principles.map((principle, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span>{principle}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold flex items-center gap-4">
                    <Puzzle className="h-8 w-8 text-primary"/>
                    What You’ll Explore
                </CardTitle>
                 <p className="text-muted-foreground pt-2">Across 8+ experiential themes, you’ll reflect, build, and connect:</p>
              </CardHeader>
              <CardContent>
                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 text-muted-foreground">
                  {themes.map((theme, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <span className="font-bold text-primary">{index + 1}.</span>
                        <span>{theme}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
