import Image from "next/image";
import React from "react";

const Subscribe = () => {
  return (
    <div className='flex justify-center items-center mt-20 mb-10'>
      <div className='mr-auto'>
        <Image
          src='/assets/images/subscribe/bg.png'
          width={790}
          height={490}
          alt='Background'
        />
      </div>
      <div className='w-[33%] ml-20 mr-20'>
        <p className='text-[32px] font-bold'>Become a contributor</p>
        <p className='text-gray-400'>
          By registering as a contributor, you can easily submit your work and
          join our growing community of arabic creatives. Simply follow a few
          easy steps to get started.
        </p>
        <button className='rounded bg-[#2C68F6] text-white py-2 px-4 hover:bg-[#104dda] mt-10'>
          Join Us
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
