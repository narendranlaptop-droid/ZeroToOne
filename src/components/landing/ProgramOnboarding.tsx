'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check, Rocket, Sparkles } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Input } from '../ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleOnboardingSubmission } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  email: z.string().email('Invalid email address'),
});

type OnboardingFormValues = z.infer<typeof formSchema>;

export function ProgramOnboarding() {
  const [step, setStep] = useState(0);
  const [isVoluntary, setIsVoluntary] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      employeeId: '',
      email: '',
    },
  });

  const totalSteps = 6;
  const progress = (step / (totalSteps - 1)) * 100;
  
  const onSubmit: SubmitHandler<OnboardingFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const newUser = await handleOnboardingSubmission(data);
      
      // Save the new user to localStorage
      const storedUsersRaw = localStorage.getItem('onboarded_users');
      const storedUsers = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
      localStorage.setItem('onboarded_users', JSON.stringify([...storedUsers, newUser]));

      toast({
        title: 'Information Saved',
        description: "Your details have been added to the student list.",
      });
      setStep(step + 1);
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: 'There was an error saving your information.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <CardHeader className="text-center items-center">
            <Sparkles className="h-12 w-12 text-primary" />
            <CardTitle className="text-3xl font-bold tracking-tight">
              🧩 Zero to One — Program Onboarding Module
            </CardTitle>
            <CardDescription className="max-w-2xl text-lg">
              Begin your journey by understanding the commitment and declaring your intent. This isn't just an admin step—it’s your first step into a new way of learning.
            </CardDescription>
          </CardHeader>
        );
      case 1:
        return (
          <CardHeader>
            <CardTitle>Welcome to Zero to One</CardTitle>
            <CardDescription>
              You’re about to begin a journey that’s less about being taught, and more about discovering your own way of learning. This program will give you time, space, and challenges to explore who you are, how you think, and how you build. Before we begin, let’s align on why you’re here — and what this journey will ask of you.
            </CardDescription>
          </CardHeader>
        );
      case 2:
        return (
          <CardHeader>
            <CardTitle>Step In, By Choice</CardTitle>
            <CardDescription>This program is self-driven. The more you bring yourself into it, the more it will give back. By joining, I confirm that I’m here voluntarily and that I take full responsibility for my own learning journey.</CardDescription>
            <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                    <Checkbox id="voluntary" checked={isVoluntary} onCheckedChange={(checked) => setIsVoluntary(checked as boolean)} />
                    <Label htmlFor="voluntary" className="text-sm font-medium leading-none">
                        I am joining the Zero to One program by my own choice.
                    </Label>
                </div>
            </CardContent>
          </CardHeader>
        );
      case 3:
        return (
            <CardHeader>
                <CardTitle>What’s Your Intent?</CardTitle>
                <CardDescription>Capture your motivation. This helps you reflect and helps mentors guide you.</CardDescription>
                <CardContent className="pt-6 space-y-4">
                    <div>
                        <Label htmlFor="intent-q1">What brings you to Zero to One?</Label>
                        <Textarea id="intent-q1" placeholder="Your thoughts..." />
                    </div>
                    <div>
                        <Label htmlFor="intent-q2">What are you hoping to learn or unlearn?</Label>
                        <Textarea id="intent-q2" placeholder="Your goals..." />
                    </div>
                </CardContent>
            </CardHeader>
        )
      case 4:
        return (
            <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Please provide your details. This will be added to the student roster for the program administrator.</CardDescription>
                <CardContent className="pt-6">
                   <form id="onboardingForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" {...form.register('name')} />
                            {form.formState.errors.name && <p className="text-sm text-destructive mt-1">{form.formState.errors.name.message}</p>}
                        </div>
                         <div>
                            <Label htmlFor="employeeId">Employee ID</Label>
                            <Input id="employeeId" {...form.register('employeeId')} />
                            {form.formState.errors.employeeId && <p className="text-sm text-destructive mt-1">{form.formState.errors.employeeId.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...form.register('email')} />
                            {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
                        </div>
                   </form>
                </CardContent>
            </CardHeader>
        );
      case 5:
        const questions = [
            "I’m open to being uncomfortable while learning.",
            "I’m ready to unlearn before I learn.",
            "I’ll make time each week for deep reflection."
        ];
        return (
             <CardHeader>
                <CardTitle>Are You Ready to Learn Differently?</CardTitle>
                <CardDescription>Learning here will sometimes feel slow, uncertain, and messy — but that’s exactly how you grow.</CardDescription>
                <CardContent className="pt-6 space-y-8">
                    {questions.map((q, i) => (
                         <div key={i}>
                            <Label>{q}</Label>
                            <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                <span>Not Ready</span>
                                <span>Fully Ready</span>
                            </div>
                            <Slider defaultValue={[3]} max={5} step={1} />
                        </div>
                    ))}
                </CardContent>
            </CardHeader>
        )
       case 6:
        return (
            <CardHeader className="items-center text-center">
                <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/50">
                    <Check className="h-10 w-10 text-green-500" />
                </div>
                <CardTitle>You’re In!</CardTitle>
                <CardDescription className="max-w-md">
                    Welcome aboard, explorer. You have successfully completed your onboarding.
                </CardDescription>
                <CardContent className="pt-6 text-left bg-muted/50 rounded-lg p-4 w-full max-w-sm">
                    <p className="font-semibold mb-2">Your Onboarding Summary:</p>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Joined voluntarily</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Declared your intent</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Understood the program design</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Committed to self-driven learning</li>
                    </ul>
                </CardContent>
            </CardHeader>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <Card className="max-w-4xl mx-auto shadow-2xl">
          {step > 0 && <Progress value={progress} className="w-full h-1" />}
          <div className="min-h-[450px] flex flex-col justify-between p-2 md:p-6">
            {renderStep()}
            <CardFooter className="flex justify-between items-center">
              {step > 0 && step < totalSteps && (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2" /> Back
                </Button>
              )}
              {step === 0 && (
                <Button className="w-full md:w-auto mx-auto" size="lg" onClick={() => setStep(1)}>
                  I'm Ready to Begin <Rocket className="ml-2" />
                </Button>
              )}
              {step > 0 && step < 4 && (
                 <Button onClick={() => setStep(step + 1)} disabled={step === 2 && !isVoluntary}>
                  Continue <ArrowRight className="ml-2" />
                </Button>
              )}
               {step === 4 && (
                 <Button type="submit" form="onboardingForm" disabled={isSubmitting}>
                   {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save and Continue <ArrowRight className="ml-2" />
                </Button>
              )}
               {step === 5 && (
                 <Button onClick={() => setStep(step + 1)}>
                  Yes, Let’s Begin the Journey <Rocket className="ml-2" />
                </Button>
              )}
              {step === totalSteps && (
                <Button className="w-full md:w-auto mx-auto" size="lg" onClick={() => router.push('/login')}>
                  Go to Login <ArrowRight className="ml-2" />
                </Button>
              )}
            </CardFooter>
          </div>
        </Card>
      </div>
    </section>
  );
}
