import z from "zod";
import { INDUSTRIES } from "./types";

export const slugSchema = z
  .string()
  .min(2, "Slug must be at least 2 characters.")
  .max(32, "Slug must be at most 32 characters.")
  .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens.")
  .regex(/^[a-z0-9]/, "Must start with a letter or number.")
  .regex(/[a-z0-9]$/, "Must end with a letter or number.");

export const passwordRules = z
  .string()
  .min(10, "Password must be at least 10 characters long")
  .max(128, "Password must be at most 128 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase character")
  .regex(/[a-z]/, "Password must contain at least one lowercase character")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character",
  );

const TeamSize = ["1-10", "11-25", "26-50", "50+"] as const;

export const step1Schema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters.")
    .max(64, "Company name must be at most 64 characters."),
  slug: slugSchema,
  logo: z.instanceof(File).nullable(),
  spirit: z.string().max(80, "spirit must be at most 80 characters."),
});

export const step2Schema = z.object({
  industry: z.enum(INDUSTRIES),
  teamSize: z.enum(TeamSize).nullable(),
  website: z
    .string()
    .url("Please enter a valid URL including https://.")
    .max(256, "URL is too long.")
    .or(z.literal("")),
  description: z
    .string()
    .max(280, "Description must be at most 280 characters.")
    .or(z.literal("")),
});

export const step3Schema = z.object({
  yourRole: z.string().min(1, "Please select your role."),
  jobTitle: z
    .string()
    .min(1, "Please enter your job title.")
    .max(64, "Job title must be at most 64 characters."),

  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(254, "Email must be at most 254 characters."),
  password: passwordRules,
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(20, "Name must be at most 20 characters.")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Name must only contain letters, spaces, hyphens, or apostrophes.",
    ),
});

export const step4Schema = z.object({
  inviteRole: z.enum(["owner", "employee", "manager"]),
  inviteEmail: z
    .string()
    .min(1, "Please enter your job title.")
    .max(64, "Job title must be at most 64 characters."),
  invitePassword: passwordRules,
});

export const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema);
