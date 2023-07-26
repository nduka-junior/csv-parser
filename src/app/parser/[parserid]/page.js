"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import Tabb from "@/components/Tabb";
function Page({ params: { parserid } }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const { getDocOnId } = useContext(Context);

  useEffect(() => {
    getDocOnId(parserid);
  }, []);

  useEffect(() => {
    if (!user) return router.push("/login");
  }, []);

  return (
    <div>
      <Tabb />
    </div>
  );
}

export default Page;
