"use client";
import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";

function Modal() {
  
    const { handlefile, readfile,name , setName } = useContext(Context);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-[20px]">Select a file to parse</DialogTitle>
        <DialogDescription>
          <Input type="text" placeholder="Name" className='my-3 text-lg' value={name} onChange={ (e) => setName(e.target.value) } />
          <div className="flex justify-center items-center  ">

            <Input
              type="file"
              onChange={handlefile}
              className="mr-4"
              accept=".csv"
            />
            <Button variant="outline" onClick={() => readfile()}>
              Parse
            </Button>
          </div>
        
       
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}

export default Modal;
