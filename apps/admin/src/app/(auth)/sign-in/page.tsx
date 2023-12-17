"use client";

import { SignInForm } from "@/components/auth/sign-in-form";

const SignIn = (): JSX.Element => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <SignInForm />
      </div>
    </section>
  );
};

export default SignIn;
