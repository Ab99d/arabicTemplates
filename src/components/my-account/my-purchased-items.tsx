import React from "react";
import { motion } from "framer-motion";
import { fadeInTop } from "@utils/motion/fade-in-top";
import Link from "@components/ui/link";
import { useWindowSize } from "@utils/use-window-size";
import { useTranslation } from "next-i18next";
import { TagsInput } from "react-tag-input-component";
// import { WithContext as ReactTags } from "@types/react-tag-input";
import axios from "axios";

const PurchasedItems: React.FC = () => {
  const { width } = useWindowSize();
  const { t } = useTranslation("common");
  const [selected, setSelected] = React.useState(["Modern"]);

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  // get tags
  // const delimiters = [KeyCodes.comma, KeyCodes.enter];
  // const [tags, setTags] = React.useState([]);
  // var tagsArray: any = [];
  // const handleAddition = (tag: any) => {
  //   setTags([...tags, tag]);
  // };
  // const handleTagClick = (index: any) => {
  //   console.log("The tag at index " + index + " was clicked");
  // };
  // const handleDrag = (tag: any, currPos: any, newPos: any) => {
  //   const newTags = tags.slice();
  //   newTags.splice(currPos, 1);
  //   newTags.splice(newPos, 0, tag);
  //   // re-render
  //   setTags(newTags);
  // };
  // const handleDelete = (i: any) => {
  //   setTags(tags.filter((tag, index) => index !== i));
  // };
  // const getArrayFromTags = () => {
  //   tags.map((i) => {
  //     tagsArray.push(i.text);
  //   });
  // };
  // getArrayFromTags();
  // console.log(tagsArray);

  // get file name
  //   const [postUrl, setPostUrl] = React.useState("");
  function handleChange(event: any) {
    const file_name = event.target.files[0].name;
    axios
      .post(
        "https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/get-presigned-url",
        {
          file_name,
        }
      )
      .then((response) => {
        console.log(response.data.URL);
        uploadFile(response.data.URL, event.target.files[0]);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }

  function uploadFile(URL: any, file: any) {
    console.log(typeof URL);
    console.log(file);
    // axios
    //   .put(URL, file, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error.message);
    //   });
    // var headers: any = {
    //     "Access-Control-Allow-Origin": "*",
    // }
    var requestOptions: any = {
      method: "PUT",
      body: file,
      redirect: "follow",
    };
    fetch(URL, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  console.log(selected);
  return (
    <>
      <h2 className="text-lg md:text-xl xl:text-2xl font-bold text-heading mb-6 xl:mb-8">
        {t("Upload New Item")}
      </h2>
      <motion.div
        layout
        initial="from"
        animate="to"
        exit="from"
        //@ts-ignore
        variants={fadeInTop(0.35)}
        className={`w-full flex flex-col`}
      >
        <form action="">
          <div style={{ width: "100%", margin: ".5rem" }}>
            <label
              htmlFor="uploadFile"
              style={{ fontSize: "15px", fontWeight: "bold" }}
            >
              Upload File *
            </label>
            <div style={{ width: "100%" }}>
              <input
                type="file"
                id="uploadFile"
                accept="image/png, image/jpg"
                onChange={handleChange}
                style={{
                  padding: "1rem",
                  borderRadius: "7px",
                  border: "0.3px solid gray",
                  outline: "none",
                  marginTop: ".5rem",
                  width: "100%",
                }}
              />
            </div>
          </div>
          {/* /////////////////////////////////////////////////////////////////////////////////// */}
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%", margin: ".5rem" }}>
              <label
                htmlFor="title"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Title *
              </label>
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  id="title"
                  style={{
                    padding: "1rem",
                    borderRadius: "7px",
                    border: "0.3px solid gray",
                    outline: "none",
                    marginTop: ".5rem",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            {/* /////////////////////////////////////////////////////////////////////////////////// */}
            <div style={{ width: "50%", margin: ".5rem" }}>
              <label
                htmlFor="price"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Price *
              </label>
              <div style={{ width: "100%" }}>
                <input
                  type="number"
                  id="price"
                  placeholder="USD"
                  style={{
                    padding: "1rem",
                    borderRadius: "7px",
                    border: "0.3px solid gray",
                    outline: "none",
                    marginTop: ".5rem",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            {/* /////////////////////////////////////////////////////////////////////////////////// */}
            <div
              style={{
                width: "50%",
                margin: ".5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                htmlFor="Design-Category"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                Design Category *
              </label>
              <select
                name="category"
                id="Design-Category"
                style={{
                  padding: "1rem",
                  borderRadius: "7px",
                  border: "0.3px solid gray",
                  outline: "none",
                  marginTop: ".5rem",
                  width: "100%",
                }}
              >
                <option value="Websites">Websites</option>
                <option value="Presentations">Presentations</option>
                <option value="Mobile">Mobile</option>
                <option value="Caligraphy">Caligraphy</option>
                <option value="Fonts">Fonts</option>
                <option value="Logos">Logos</option>
                <option value="Typography">Typography</option>
              </select>
            </div>
          </div>
          {/* /////////////////////////////////////////////////////////////////////////////////// */}
          {/* <div
            style={{
              width: "100%",
              margin: ".5rem",
            }}
          >
            <label
              htmlFor="Design-Category"
              style={{ fontSize: "15px", fontWeight: "bold" }}
            >
              Tags *
            </label>
            <div>
              <ReactTags
                tags={tags}
                delimiters={delimiters}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                handleTagClick={handleTagClick}
                inputFieldPosition="bottom"
                autocomplete
              />
            </div>
          </div> */}
          <div>
            <h1>Add Fruits</h1>
            <pre>{JSON.stringify(selected)}</pre>
            <TagsInput
              value={selected}
              onChange={setSelected}
              name="fruits"
              placeHolder="enter fruits"
            />
            <em>press enter or comma to add new tag</em>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default PurchasedItems;
