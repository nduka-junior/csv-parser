import React from "react";
import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import Link from "next/link";
function DataDisplay() {
  const { firestoreData } = useContext(Context);
  console.log(firestoreData);
  firestoreData?.length > 0;
  return (
    <div className="mt-7">
      {firestoreData?.map((data) => {
        return (
          <div
            key={data.id}
            className="flex justify-between items-center border-2 p-3 rounded-lg  mb-4 w-[80vw]"
          >
            <h1 className="text-xl">
              {data.dataName.charAt(0).toUpperCase() + data.dataName.slice(1)}
            </h1>
            <Link
              href={`/parser/${data.id}`}
              className=" p-3 rounded-3xl text-white bg-[#000000] hover:bg-[#000000c9] border-none"
            >
              View all
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default DataDisplay;
