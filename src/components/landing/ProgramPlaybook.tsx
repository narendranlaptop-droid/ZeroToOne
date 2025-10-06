import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProgramPlaybook() {
  const principles = [
    'Go slow to go fast — true mastery takes time and patience.',
    'Everything is a hypothesis — question everything until it makes sense.',
    'Create your own data — when none exists, make your own.',
    'Never make a mind map static — because learning is always evolving.',
    'Version control your growth — your first version will suck, but that’s progress.',
  ];

  const themes = [
    'Dignity of Work – Find meaning in effort and ownership.',
    'Prompt Your Way to Wisdom – Learn how to think, not just respond.',
    'Give Purpose to Your Journey – Align what you do with why you do it.',
    'What’s All This Fuss About AI? – Demystify technology’s role in human creativity.',
    'Look Within – Cultivate awareness and emotional intelligence.',
    'You Are a Superhuman (If You Listen) – Master the lost art of deep listening.',
    'Mapping Helps in Making Sense – Learn how to visualize thoughts and systems.',
    'Everything Is a Hypothesis – Develop a scientific mindset toward problem-solving.',
    'Ask Questions Relentlessly – Curiosity drives progress.',
    'Know the BPF (Big Picture First) – Context before content.',
    'Go Slow to Go Fast – Build sustainable speed through clarity.',
    'Embrace V1s – Your first version will be messy, but necessary.',
    'Data Thinking – From pDNA to EDA, learn how to reason with information.',
    'Full-Stack Learning – Build real-world projects with UI, UX, SQL, and PowerBI.',
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              🌱 Zero to One — The Program Playbook
            </h2>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">🧭 What is Zero to One?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Zero to One is a learning journey designed by Prafulla that helps students move from passive learners to powerful doers.
                </p>
                <p>
                  The goal isn’t to teach but to create space — space to explore, question, build, and fail safely — because true learning happens not when you’re taught, but when you discover.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">🎯 Why This Program Exists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  In today’s fast-paced world, knowledge is everywhere — but understanding is rare.
                </p>
                <p>
                  Zero to One exists to slow down the process, to help learners think deeply, connect dots, and grow in a way that feels authentic and sustainable.
                </p>
                <p>
                  It’s not about finishing lessons — it’s about becoming someone who learns for life.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">🔍 How the Program Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Over two months, students explore foundational themes that shape both mindset and skillset.
                  The experience blends reflection, problem-solving, and hands-on creation — helping you evolve from knowing things to building things.
                </p>
                <h4 className="font-semibold text-foreground">Key principles of the journey:</h4>
                <ul className="list-disc space-y-2 pl-6">
                  {principles.map((principle, index) => (
                    <li key={index}>{principle}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">🧩 What You’ll Explore</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  Across 8+ experiential themes, you’ll reflect, build, and connect:
                </p>
                <ul className="list-decimal space-y-2 pl-6 marker:font-semibold">
                  {themes.map((theme, index) => (
                    <li key={index}>{theme}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
