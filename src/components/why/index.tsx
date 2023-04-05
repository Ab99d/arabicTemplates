import React from "react";
import Card from "./Card";

const WhySection = () => {
  return (
    <div className='mt-10 mb-20 bg-gray-200 py-16'>
      <div className='2xl:mx-48'>
        <p className='text-center font-bold text-[32px]'>
          Why Arabic Templates?
        </p>

        <div className='flex justify-center items-center flex-wrap lg:flex-nowrap'>
          <Card
            text='Home for Arabic Designs'
            description='Clean and smart source code increases website loading speed'
            img='icon-clock.svg'
          />
          <Card
            text='Authentic Arabic Content'
            description='All code is evaluated and validated by the W3 standard'
            img='icon-validated.svg'
          />
          <Card
            text='By Designers for Designers'
            description='Innovative design and convenient for editing, publishing'
            img='icon-creative.svg'
          />
          <Card
            text='The First Platform for Arabic Templates'
            description='Show perfectly on your PC desktop'
            img='icon-responsive.svg'
          />
        </div>
      </div>
    </div>
  );
};

export default WhySection;
