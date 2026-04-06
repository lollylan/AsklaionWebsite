import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const forge = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/forge' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    category: z.enum(['install', 'webapp']),
    tags: z.array(z.string()),
    anforderung: z.enum(['GERING', 'MITTEL', 'HOCH', 'WEBAPP']),
    description: z.string(),
    github_url: z.string().default(''),
    release_url: z.string().default(''),
    demo_url: z.string().default(''),
    demo_label: z.string().default(''),
    video_url: z.string().default(''),
    academy_course_slug: z.string().nullable().default(null),
    screenshot: z.string().default(''),
    notice: z.string().default(''),
    notice_link: z.string().default(''),
    notice_link_label: z.string().default(''),
  }),
});

const academy = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/academy' }),
  schema: z.object({
    title: z.string(),
    course: z.string(),
    lesson_number: z.number(),
    description: z.string().default(''),
    video_url: z.string().default(''),
  }),
});

const academyCourses = defineCollection({
  loader: glob({ pattern: '**/meta.json', base: './src/content/academy' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    level: z.enum(['Anfänger', 'Fortgeschritten']),
    duration: z.string().optional(),
    prerequisites: z.array(z.string()).default([]),
  }),
});

export const collections = { forge, academy, academyCourses };
