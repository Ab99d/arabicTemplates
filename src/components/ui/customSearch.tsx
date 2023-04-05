import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import ListBox from "./list-box";
import { useDispatch } from "react-redux";
import { customSearch } from "src/redux/itemsSlice";
import axios from "axios";

const Search: FC<{ width: string; px: string; querystr?: string }> = ({
  width,
  querystr = "",
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePush = () => {
    router.push({ pathname: "/search" });
    dispatch(customSearch(query));
  };

  return (
    <div
      className={
        width === "w-mobile"
          ? `flex w-[108%] -ml-4 py-0 rounded-r-lg mx-0`
          : `flex ${width} py-0 rounded-r-lg`
      }
    >
      <ListBox
        options={[
          { name: "All", value: "all" },
          { name: "Websites", value: "Websites" },
          { name: "Presentations", value: "Presentations" },
          { name: "Mobile", value: "Mobile" },
          { name: "Caligraphy", value: "Caligraphy" },
          { name: "Fonts", value: "Fonts" },
          { name: "Logos", value: "Logos" },
          { name: "Typography", value: "Typography" },
        ]}
        isMobile={width === "w-mobile" ? true : false}
        querystr={querystr}
      />
      {/* <select
        name=""
        id=""
        style={{ borderRadius: "10px 0 0 10px", padding: ".5rem" }}
      >
        <option value="" style={{ borderRadius: "10px 0", padding: ".5rem" }}>
          All
        </option>
        <option value="" style={{ borderRadius: "10px 0", padding: ".5rem" }}>
          Websites
        </option>
        <option value="" style={{ borderRadius: "10px 0", padding: ".5rem" }}>
          Presentations
        </option>
        <option value="" style={{ borderRadius: "10px 0", padding: ".5rem" }}>
        Mobile
        </option>
      </select> */}
      <input
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        id="website-admin"
        className="bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
        placeholder="Search templates, designs, etc..."
      />
      <button
        onClick={handlePush}
        // disabled={query.length === 0}
        className="inline-flex items-center px-3 text-sm text-gray-900 bg-[#f8f8fa] border border-l-0 border-gray-300 rounded-r-lg disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Search;
