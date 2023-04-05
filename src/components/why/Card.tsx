import Image from "next/image";
import React, { FC } from "react";

const Card: FC<{ text: string; description: string; img: string }> = ({
  text,
  description,
  img,
}) => {
  return (
    <div className='mx-5 mt-10 h-[250px] w-1/4'>
      <div className=''>
        <Image
          src={`/assets/images/why/${img}`}
          width={60}
          height={60}
          alt='test'
        />
      </div>
      <div className='font-bold text-[20px] my-5 text-[#2C68F6]'>{text}</div>

      <div className='text-gray-400 text-[14px]'>{description}</div>
    </div>
  );
};

export default Card;
