"use client"

import { Button } from '@repo/ui/components/ui/button';
import { userStore } from '@/lib/store/store'

export default function Page(): JSX.Element {
  const { user, login } = userStore()
  const handleAddUser = (): void => {
    login('123', 'admin');
  }
  return (
    <div>
      <Button onClick={handleAddUser}>admin</Button>
      <h1>{JSON.stringify(user)}</h1>
    </div>
  );
}
