import { z } from "zod";

export const ProgramSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.any(),
    href: z.string(),
    color: z.string(),
});

export const TrainerSchema = z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    specialties: z.array(z.string()),
    image: z.any(),
});

export const ClassSchema = z.object({
    id: z.string(),
    name: z.string(),
    trainerId: z.string(),
    day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]),
    time: z.string(), // e.g. "06:00"
    duration: z.number(), // in minutes
    type: z.enum(["Strength", "HIIT", "Recovery", "Boxing", "Yoga"]),
    intensity: z.enum(["Low", "Moderate", "High", "Extreme"]),
    spotsLeft: z.number(),
    slug: z.string(),
});

export const PricingTierSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.string(),
    period: z.string(),
    features: z.array(z.string()),
    isPopular: z.boolean().default(false),
    cta: z.string().default("Choose Plan"),
});

export type Program = z.infer<typeof ProgramSchema>;
export type Trainer = z.infer<typeof TrainerSchema>;
export type ClassSession = z.infer<typeof ClassSchema>;
export type PricingTier = z.infer<typeof PricingTierSchema>;
