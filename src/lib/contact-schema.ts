import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email: z.string().min(1, "Please enter your email.").email("Please enter a valid email."),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little about what you need."),
});

export type ContactInput = z.infer<typeof contactSchema>;
