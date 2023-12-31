"use client"

import { useSuspenseQuery } from '@apollo/client';
import { redirect } from 'next/navigation';

import { GET_STORE } from '@/lib/graphql/query';
import { useStoreModal } from '@/lib/store/model';
import { userStore } from '@/lib/store/user';

export interface StoreData {
  data: {
    getStore: {
      id: string;
      name: string;
      description: string;
      slug: string;
    };
  };
}


export default function SetupLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const { user } = userStore();
  const storeModal = useStoreModal();
  if (!user?.id) {
    redirect('/sign-in');
  }
  const { data } = useSuspenseQuery(GET_STORE, {
    variables: {
      vendorId: user.id
    },
  }) as StoreData
  if (data.getStore) {
    storeModal.currentStoreId = data.getStore.id;
    redirect(`/vendor/${data.getStore.id}`);
  }
  return (
    <>
      {children}
    </>
  );
};
