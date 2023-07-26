"use client";
import Tabb from "@/components/Tabb";
import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import { useRouter } from "next/navigation";
function Page() {
  const { data, user } = useContext(Context);

  const router = useRouter();
  useEffect(() => {
    if (!data) return router.push(`/user/${user?.uid}`);
  }, []);
  return (
    <div className="p-10">
      <Tabb />
    </div>
  );
}

export default Page;
