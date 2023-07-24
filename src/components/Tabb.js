import React from "react";
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
function Tabb({ data }) {
  return (
    data && (
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* <TableRow>
          <TableCell>{Object.values}</TableCell>
          <TableCell>{k.Description}</TableCell>
          <TableCell>{k.Founded}</TableCell>
        </TableRow> */}
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
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    )
  );
}

export default Tabb;
