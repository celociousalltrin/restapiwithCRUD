import React from "react";
import CustomAPI from "../Component/baseApi";
import { useState, useEffect } from "react";
import HomeChild from "./HomeChild";

const HomeParent = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    CustomAPI.get("/postJson")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>RestAPI with CRUD</h1>
      <input
        type="text"
        placeholder="search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <HomeChild data={data} query={query}/>
    </div>
  );
};

export default HomeParent;
