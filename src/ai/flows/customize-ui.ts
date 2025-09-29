'use server';
/**
 * @fileOverview A UI customization AI agent.
 *
 * - customizeUI - A function that handles the UI customization process.
 * - CustomizeUIInput - The input type for the customizeUI function.
 * - CustomizeUIOutput - The return type for the customizeUI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomizeUIInputSchema = z.object({
  primaryColor: z
    .string()
    .describe('The primary color of the UI, in hex format (e.g., #3F51B5).'),
  backgroundColor: z
    .string()
    .describe('The background color of the UI, in hex format (e.g., #E8EAF6).'),
  font: z
    .string()
    .describe('The font to use for the UI (e.g., Inter).'),
  iconographyStyle: z
    .string()
    .describe('The desired style for the iconography (e.g., simple, modern).'),
});
export type CustomizeUIInput = z.infer<typeof CustomizeUIInputSchema>;

const CustomizeUIOutputSchema = z.object({
  cssVariables: z
    .string()
    .describe(
      'A string containing CSS variables that can be used to style the UI.'
    ),
});
export type CustomizeUIOutput = z.infer<typeof CustomizeUIOutputSchema>;

export async function customizeUI(input: CustomizeUIInput): Promise<CustomizeUIOutput> {
  return customizeUIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customizeUIPrompt',
  input: {schema: CustomizeUIInputSchema},
  output: {schema: CustomizeUIOutputSchema},
  prompt: `You are a UI customization expert. Generate CSS variables based on the following preferences:

Primary color: {{{primaryColor}}}
Background color: {{{backgroundColor}}}
Font: {{{font}}}
Iconography style: {{{iconographyStyle}}}

Return the CSS variables as a string. Include variables for primary color, background color, font family, and icon style.

Example output:

:root {
  --primary-color: #3F51B5;
  --background-color: #E8EAF6;
  --font-family: Inter, sans-serif;
  --icon-style: simple;
}`,
});

const customizeUIFlow = ai.defineFlow(
  {
    name: 'customizeUIFlow',
    inputSchema: CustomizeUIInputSchema,
    outputSchema: CustomizeUIOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
