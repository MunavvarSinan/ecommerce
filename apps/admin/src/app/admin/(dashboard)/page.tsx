"use client";

import { userStore } from "@/lib/store/user";

export default function Page(): JSX.Element {
  const { user } = userStore();
  return <h1>{JSON.stringify(user)}</h1>;
}
