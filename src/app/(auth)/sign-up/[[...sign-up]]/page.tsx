import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp path={process.env.CLERK_SIGN_UP_URL} />;
}
