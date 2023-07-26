"use client";
import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();

  const { user } = useContext(Context);
  useEffect(() => {
    if (!user) return router.push("/login");
  }, []);
  return (
    <div className="flex h-[80vh] items-center justify-center">
      {" "}
      Coming soon...
    </div>
  );
}

export default Page;
