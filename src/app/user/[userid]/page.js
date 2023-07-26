"use client";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Modal from "@/components/Modal";

function page() {
  const router = useRouter();
  const { user } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      toast.success(`${user?.displayName} Logged in`);
      localStorage.removeItem("user");
    }
  }, []);
  if (!user) return router.push("/login");
  return (
    <div
      className="flex justify-center items-center h-[60vh] w-full"  
    
    >
      <h1 className="mr-5">New AttendX</h1>
     

      <Dialog>
        <DialogTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </DialogTrigger>
        <Modal />
      </Dialog>
    </div>
  );
}

export default page;
