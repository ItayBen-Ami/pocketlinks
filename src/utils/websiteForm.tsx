import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(50),
  url: z.string().url(),
  image: z.string().url(),
  category: z.string().min(2).max(50),
});
