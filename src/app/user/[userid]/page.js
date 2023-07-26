"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Modal from "@/components/Modal";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DataDisplay from "@/components/DataDisplay";
function Page() {
  const router = useRouter();
  const { user } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      toast.success(`${user?.displayName} Logged in`);
      localStorage.removeItem("user");
    }
  }, []);
  useEffect(() => {
    if (!user) return router.push("/login");
  }, []);
  if (user)
    return (
      <div className="flex justify-center flex-col items-center h-[60vh] w-full ">
        <div className=" border-2 border-[#000000ce] border-solid w-[50vw]  text-center   rounded-lg ">
          {/* <h1 className=" w-[100%] px-5 ">New AttendX</h1> */}

          <Dialog>
            <DialogTrigger className="group flex items-center justify-center w-[100%] h-[100%] p-2 hover:bg-[#212D40] hover:text-[#9AD1D4]">
              <h1 className="w-100 mr-4 text-2xl ">New AttendX</h1>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.9em"
                viewBox="0 0 448 512"
              >
                <path
                  d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                  className=" group-hover:fill-[#9AD1D4]"
                />
              </svg>
            </DialogTrigger>
            <Modal />
          </Dialog>
        </div>
        <DataDisplay />
      </div>
    );
}

export default Page;
