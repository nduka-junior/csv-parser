"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import UserInfo from "./UserInfo";
function Nav() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const signOut = () => {
    auth.signOut().then((res) => {
      console.log(res);
      localStorage.setItem("logout", "true");
      router.push("/login");
    });
  };
  return (
    <div className="flex justify-between items-center p-2 bg-[#000000] text-white ">
      <div className="2xl font-bold ">CsV Display</div>

      {user && (
              <div className="flex items-center ">
                <UserInfo />
          <Button
            variant="outline"
            className="bg-[none] outline-none border-none
          text-[#ffffff]  text-[12px]"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}

export default Nav;
