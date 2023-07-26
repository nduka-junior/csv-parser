"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import google from "@/static/google_light.png";
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
function Page() {
  const { signInWithGoogle, user, error } = useContext(Context);

  const router = useRouter();
  useEffect(() => {
    if (user) router.push(`/user/${user.uid}}`);
    if (error) toast.error(error);
  }, []);
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <Button
        variant="outline"
        className="p-5"
        onClick={() => signInWithGoogle()}
      >
        <Image src={google} width={40} height={40} alt="icon" />

        <span className="2xl  ml-2"> Sign in with google</span>
      </Button>
    </div>
  );
}

export default Page;
