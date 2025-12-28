import { z } from 'zod';

export const ratingSchema = z.union([z.number(), z.literal('todo'), z.literal('progress')]);

export type Rating = z.infer<typeof ratingSchema>;
