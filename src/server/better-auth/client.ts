import { emailOTPClient, magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [emailOTPClient(), magicLinkClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
