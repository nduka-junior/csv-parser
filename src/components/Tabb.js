import { useContext } from "react";
import { Context } from "@/components/ContextProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";

function Tabb() {
  const { search, setSearch, data } = useContext(Context);
  const [input, setInput] = useState(0);
  const inputRef = useRef(0);
  const { name } = useContext(Context);

  
  return (
    data && (
      <>
        <Input
          type="text"
          placeholder="Search for an item"
          className=" mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table className=" mt-5">
          <TableCaption>
            {data.filterData?.length <= 0 && (
              <div className="text-center text-3xl m-3">No Data Found</div>
            )}
            {data.data.length > 0 && <>A list of your recent invoices.</>}
          </TableCaption>
          <TableHeader>
            <TableRow>
              {data &&
                Object.values(data.meta.fields).map((k, id) => {
                  return <TableHead key={id}>{k}</TableHead>;
                })}

              {/* <TableHead>Attendance</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.data.map((k, id) => {
                return (
                  <TableRow key={id}>
                    {Object.values(k).map((v, id) => {
                      return (
                        <TableCell key={id}>
                          {v.includes("http") && <Link href={v}> {v}</Link>}
                          {!v.includes("http") && v}
                        </TableCell>
                      );
                    })}
                    {/* {
                      <TableCell key={id}>
                        <Input
                          type="number"
                          step="1"
                          ref={inputRef}
                          onChange={(e) => setInput(e.target.value)}
                        />
                      </TableCell>
                    } */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </>
    )
  );
}

export default Tabb;
