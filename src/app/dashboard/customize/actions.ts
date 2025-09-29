'use server';

import { customizeUI, CustomizeUIInput, CustomizeUIOutput } from '@/ai/flows/customize-ui';

export async function handleCustomizeUI(input: CustomizeUIInput): Promise<CustomizeUIOutput> {
  try {
    const result = await customizeUI(input);
    return result;
  } catch (error) {
    console.error('Error customizing UI:', error);
    return { cssVariables: '/* An error occurred while generating the theme. */' };
  }
}
