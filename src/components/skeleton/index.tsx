import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <div className='outline-[0.5px] outline-gray-350'>
      <h4 className='card-title'>
        <Skeleton height={250} width={300} />
        <Skeleton height={36} width={300} />
      </h4>
      <p className='px-0 mx-0'>
        <Skeleton height={10} width={`20%`} />
      </p>
    </div>
  );
};

export default SkeletonCard;
