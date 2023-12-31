"use client";

import { SignInForm } from "@repo/ui/components/auth/sign-in-form";
import { LOGIN } from "@repo/ui/lib/graphql/mutation";

import { userStore } from "@/lib/store/user";


const SignIn = (): JSX.Element => {
  const { loginState } = userStore();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <SignInForm LOGIN={LOGIN} loginState={loginState} />
      </div>
    </section>
  );
};

export default SignIn;
