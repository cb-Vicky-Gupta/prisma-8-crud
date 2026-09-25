// Request validation: describes what the client is allowed to send.
// zod checks the body and gives you a typed object back.
import { z } from "zod";

export const signupSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(72), // bcrypt ignores bytes past 72
  name: z.string().trim().min(1).max(100),
});

export type SignupInput = z.infer<typeof signupSchema>;
