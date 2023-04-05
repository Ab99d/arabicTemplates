import { useCategoriesQuery } from "@framework/category/get-all-tags";
import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCurrentTags, getCurrentType } from "src/redux/itemsSlice";

// filter tag

export const TagFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const dispatch = useDispatch();
  // const { data, isLoading } = useCategoriesQuery({
  //   limit: 10,
  // });

  const [Items, setItems] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://modbzw1g3m.execute-api.eu-central-1.amazonaws.com/get-designs?Category=All&File`,
        // &Sort=${query.Sort}&PriceMin=${query.PriceMin}&PriceMax=${query.PriceMax}&File=${query.File}&Title=${query.Title}&Unapproved=${query.Unapproved}&Tag=${query.Tag}&Tags=${query.Tags}
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setItems(result.data);
    };
    fetchData();
  }, []);

  const selectedCategories = query?.category
    ? (query.category as string).split(",")
    : [];
  const [formState, setFormState] =
    React.useState<string[]>(selectedCategories);

  React.useEffect(() => {
    setFormState(selectedCategories);
  }, [query?.category]);

  // if (isLoading) return <p>Loading...</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    const { category, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { category: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  // console.log(Items?.items[0]?.Tags);

  let TagsArr: any[] = [];
  const getFileType = () => {
    for (let i = 0; i < Items?.items?.length; i++) {
      const getAllTags = Items?.items[i]?.Tags;
      const allTypesIncluded = getAllTags.every((type) =>
        TagsArr.includes(type)
      );
      if (!allTypesIncluded) {
        TagsArr.push(...getAllTags.filter((type) => !TagsArr.includes(type)));
      }
    }
  };
  getFileType();

  // console.log(TagsArr);

  const handleFileTypeFilter = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    dispatch(getCurrentTags(value));
  };

  return (
    <div className="block pb-7 mt-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        Tags
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {TagsArr?.map((item: any) => (
          <CheckBox
            key={item.id}
            label={item}
            name={item?.toLowerCase()}
            // checked={formState.includes(item.slug)}
            value={item}
            onChange={handleFileTypeFilter}
          />
        ))}
      </div>
    </div>
  );
};
