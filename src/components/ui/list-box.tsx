import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { categoryFilter } from "src/redux/itemsSlice";
type Option = {
  name: string;
  value: string;
};

export default function ListBox({
  options,
  querystr,
}: {
  options: Option[];
  isMobile: boolean;
  querystr: string;
}) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname, query } = router;
  const currentSelectedItem = query?.sort_by
    ? options.find((o) => o.value === query.sort_by)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);
  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [query?.sort_by]);
  function handleItemClick(values: Option) {
    setSelectedItem(values);
    const { sort_by, ...restQuery } = query;
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(values.value !== options[0].value
            ? { sort_by: values.value }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );
  }

  React.useEffect(() => {
    dispatch(categoryFilter(selectedItem.value));
  }, [selectedItem.value]);

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative ms-2 lg:ms-0 z-10">
          <Listbox.Button className="border hover:bg-white hover:text-black border-gray-300 flex justify-center py-3 text-heading text-[13px] md:text-sm font-semibold relative w-fit ps-3 pe-10 text-start bg-[#f8f8fa] rounded-l-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer">
            <span className="block truncate">
              {querystr ? querystr : t(selectedItem.name)}
            </span>
            <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
              <IoMdArrowDropdown
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-[20] w-[300%] md:w-fit py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
            >
              {options?.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-gray-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 ps-2 pe-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {t(option.name)}
                      </span>
                      {/* {selected ? (
                        <span
                          className={`${active ? "text-amber-600" : ""}
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}>
                          <HiCheck className='w-5 h-5' aria-hidden='true' />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
