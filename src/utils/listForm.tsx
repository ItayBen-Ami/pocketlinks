import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(50),
  imageUrl: z.instanceof(File).optional(),
  is_public: z.boolean().default(false),
});
