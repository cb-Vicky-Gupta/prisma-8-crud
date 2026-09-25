// Service: business rules. No req/res and no direct database access.
import { signToken } from "../../lib/auth-token.ts";
import { isUniqueViolation } from "../../lib/db-errors.ts";
import { HttpError } from "../../lib/http-error.ts";
import { hashPassword } from "../../lib/password.ts";
import * as userRepository from "../../repositories/user.repository.ts";
import type { SignupInput } from "./auth.schema.ts";

export async function signup({ email, password, name }: SignupInput) {
  // 1. Email must be unique.
  const existing = await userRepository.findUserByEmail(email);
  if (existing) {
    throw HttpError.conflict("Email is already registered");
  }

  // 2. Never store the plain password.
  const passwordHash = await hashPassword(password);

  // 3. Save the user. The unique index still guards against two
  //    simultaneous signups that both passed the check above.
  const user = await userRepository
    .createUser({ email, passwordHash, name })
    .catch((error: unknown) => {
      if (isUniqueViolation(error)) throw HttpError.conflict("Email is already registered");
      throw error;
    });

  // 4. Log them in straight away.
  const token = signToken(user);

  return { user, token };
}
