'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { handleCustomizeUI } from '@/app/dashboard/customize/actions';
import { useAuthRedirect } from '@/hooks/use-auth-redirect';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color'),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Must be a valid hex color'),
  font: z.string().min(2, 'Font name is required'),
  iconographyStyle: z.string().min(2, 'Iconography style is required'),
});

export function CustomizeUI() {
  useAuthRedirect('admin');
  const [isPending, startTransition] = useTransition();
  const [generatedCss, setGeneratedCss] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      primaryColor: '#3F51B5',
      backgroundColor: '#E8EAF6',
      font: 'Inter',
      iconographyStyle: 'simple, modern',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const result = await handleCustomizeUI(values);
      if (result.cssVariables) {
        setGeneratedCss(result.cssVariables);
      }
    });
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
        <div>
          <FormField
            control={form.control}
            name="primaryColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Color</FormLabel>
                <FormControl>
                  <Input type="color" {...field} className="p-1 h-12"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Color</FormLabel>
                <FormControl>
                    <Input type="color" {...field} className="p-1 h-12"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="font"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Font</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Inter" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="iconographyStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Iconography Style</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., simple, modern" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Theme
          </Button>
          </div>
      <div>
        <FormLabel>Generated CSS</FormLabel>
        <Textarea
            readOnly
            value={generatedCss}
            placeholder="Generated CSS variables will appear here..."
            className="mt-2 h-72 font-mono bg-muted"
        />
        <p className="text-sm text-muted-foreground mt-2">
            Copy and paste this code into your global CSS file to apply the new theme.
        </p>
      </div>
        </form>
      </Form>
  );
}
