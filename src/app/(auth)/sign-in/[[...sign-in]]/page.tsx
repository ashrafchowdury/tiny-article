import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn path={process.env.CLERK_SIGN_IN_URL} />;
}
