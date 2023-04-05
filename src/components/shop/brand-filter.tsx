import { CheckBox } from "@components/ui/checkbox";
import { useBrandsQuery } from "@framework/brand/get-all-brands";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getCurrentType } from "../../redux/itemsSlice";

// File Type filter

export const BrandFilter = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { pathname, query } = router;
  const dispatch = useDispatch();

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

  const selectedBrands = query?.brand ? (query.brand as string).split(",") : [];
  const [formState, setFormState] = React.useState<string[]>(selectedBrands);
  React.useEffect(() => {
    setFormState(selectedBrands);
  }, [query?.brand]);
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>{error.message}</p>;
  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    let currentFormState = formState.includes(value)
      ? formState.filter((i) => i !== value)
      : [...formState, value];
    // setFormState(currentFormState);
    const { brand, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { brand: currentFormState.join(",") }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  let fileTypeArr: any[] = [];
  const getFileType = () => {
    for (let i = 0; i < Items?.items?.length; i++) {
      // console.log(Items?.items[i].fileType);
      if (!fileTypeArr.includes(Items?.items[i]?.fileType)) {
        fileTypeArr.push(Items?.items[i]?.fileType);
      }
    }
  };
  getFileType();

  // console.log(fileTypeArr);
  const data = Items?.items;

  const handleFileTypeFilter = (e: React.FormEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    dispatch(getCurrentType(value));
  };

  return (
    <div className="block border-b border-gray-300 pb-7 mb-7">
      <h3 className="text-heading text-sm md:text-base font-semibold mb-7">
        File Type
      </h3>
      <div className="mt-2 flex flex-col space-y-4">
        {fileTypeArr?.map((item: any) => (
          <CheckBox
            key={item?.id}
            label={item}
            name={item?.toLowerCase()}
            // checked={formState.includes(item)}
            value={item}
            onChange={handleFileTypeFilter}
          />
        ))}
      </div>
    </div>
  );
};
