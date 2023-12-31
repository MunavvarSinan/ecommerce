"use client"

import { useParams } from "next/navigation";

const StorePage = (): JSX.Element => {
  const { storeId } = useParams<{ storeId: string }>();
  return (
    <h1>{storeId}</h1>
  );
}

export default StorePage;
