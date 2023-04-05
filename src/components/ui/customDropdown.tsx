import React, { useState } from "react";

const options = ["All", "Illustrations", "Template Presentation", "Logos"];
const CustomDropdown = () => {
  const [value, setValue] = useState(options[0]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(!open)} className='flex justify-between'>
        <button>{value}</button>
        <span>AR</span>
      </div>

      {open && (
        <ul>
          {options.map((option) => (
            <li onClick={() => setValue(option)} key={option}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CustomDropdown;
