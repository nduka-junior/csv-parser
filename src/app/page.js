"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { parse } from "papaparse";
import Tabb from "@/components/Tabb";

export default function Home() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [mainData, setMainData] = useState(null);
  const handlefile = (e) => {
    setFile(e.target.files);
    console.log(file);
  };
  const handleSearch = () => {
    const getSearch = search.trim().toLowerCase();
    console.log(getSearch);
    const filterData = mainData.data.filter((items) => {
      return Object.values(items).some((value) => {
        console.log(value);
        return value.toLowerCase().includes(getSearch);
      });
    });
    setData({ ...data, data: filterData, filterData });
    console.log(filterData);
    if (search.length === 0) setData(mainData);
  };
  useEffect(() => {
    if (data) {
      handleSearch();
      console.log(search);
    }
  }, [search]);
  const readfile = () => {
    if (!file) {
      return alert("Please Upload a file");
    }
    console.log("working!!");
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result;
      console.log(csv);
      const results = parse(csv, { header: true });
      console.log(results);
      setData(results);
      setMainData(results);
    };
    reader.readAsText(file[0]);
    setFile("");
  };

  return (
    <div className="p-5">
      <div className="!mx-[20vw] flex flex-col justify-center">
        <div className="flex justify-center items-center  ">
          <Input
            id="picture"
            type="file"
            onChange={handlefile}
            className="mr-4"
          />
          <Button variant="outline" onClick={() => readfile()}>
            Parse
          </Button>
        </div>
        <Input
          type="text"
          placeholder="Search"
          className=" mt-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabb data={data} />
    </div>
  );
}
